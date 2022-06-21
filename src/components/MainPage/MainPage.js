import "./MainPage.scss";
import logo from "../../assets/tesodevlogo.png";
import locationmark from "../../assets/locationmark.png"
import searchicon from "../../assets/search-icon.png";
import Carousel from "../carousel/carousel";
import { useState } from "react";
import data from "../../data.json";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";

export default function MainPage() {
  const [inputValue, setInputValue] = useState("");
  const [filteredData, setFilteredData] = useState();
  const handleChange = (e) => {
    
    setInputValue(e.target.value);
    setFilteredData(
      objs.filter((item) => item.name.toLowerCase().includes(e.target.value))
    );

  };

  let objs= data.data.map(x => (
    { 
    name: x[0], 
    company: x[1] ,
    Email:x[2],
    Date:x[3],
    Country:x[4],
    City:x[5],
  }));
  return (
    <div className="mainpage">
      <div className="btn__container">
      <Link to={`/addlink`} >
        <button className="btn__newRecord">Add new record</button>
        </Link>
      </div>
      <div className="logo__container">
        <img alt="tesodev logo" src={logo}></img>
      </div>
      <p className="logo__definition">Search app</p>
      <div className="header__container">
        <h1 className="header__content">Find in records</h1>
      </div>
      <div className="search">
        <div className="search__container">
          <img
            alt="search icon"
            className="search__icon"
            src={searchicon}
          ></img>
          <input
            onChange={(e) => handleChange(e)}
            className="search__input"
          ></input>
        </div>
        <Link to={`/search`} state={{ value: inputValue, filteredData,objs  }}>
        <button  disabled={!inputValue ||filteredData.length<1 ? true : false } className="search__btn">Search</button>
        </Link>
      </div>

      {inputValue.length > 1 && filteredData.length >0  ? (
        <div className="results">
          <div className="results__wrapper">
          { filteredData.slice(0, 3).map((item) => (
            <div className="results__container">
              <img alt="location mark" src={locationmark} className="results__mark"></img>
              <div className="results__item">
                <span className="results__name"> {`${item.name}`} </span>
                <span className="results__location"> {` ${item.Country},${item.City}`}</span>
              </div>
              
            </div>
          ))}
          {filteredData?.length > 3 ?
            <Link style={{ textDecoration: 'none'}} to={`/search`} state={{ value: inputValue, filteredData , objs }}>
           <span className="results__showmore">Show More..</span> 
           </Link>
           : null}
        </div>
        </div>
        
      ) : null}

      <div className="top-news">
        <h1 className="top-news__header">Top News</h1>
        <div>
          <Carousel></Carousel>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
