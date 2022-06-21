import React, { useState, useEffect } from "react";
import "../MainPage/MainPage.scss";
import "./Search.scss";
import logo from "../../assets/tesodevlogo.png";
import locationmark from "../../assets/locationmark.png";
import orderbyIcon from "../../assets/orderby.png";
import { Link, useLocation } from "react-router-dom";
import moment from "moment";
function Search() {
  const [searchedData, setSearchedData] = useState();
  const [propsData, setPropsData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [showButtons, setShowButtons] = useState(false);
  const location = useLocation();
  const searchProps = location.state;
  let sortedName;

  useEffect(() => {
    setPropsData(searchProps.filteredData);
  }, [searchProps.filteredData]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = searchedData
    ? searchedData.slice(indexOfFirstPost, indexOfLastPost)
    : searchProps.filteredData.slice(indexOfFirstPost, indexOfLastPost);

  const ascending = () => {
    sortedName = searchedData
      ? searchedData.sort(function (a, b) {
          if (a.name < b.name) return -1;
          else if (a.name == b.name) return 0;
          else return 1;
        })
      : searchProps.filteredData.sort(function (a, b) {
          if (a.name < b.name) return -1;
          else if (a.name == b.name) return 0;
          else return 1;
        });
    searchedData
      ? setSearchedData([...sortedName])
      : setPropsData([...sortedName]);
  };
  const descending = () => {
    sortedName = searchedData
      ? searchedData.sort(function (a, b) {
          if (a.name < b.name) return -1;
          else if (a.name == b.name) return 0;
          else return 1;
        })
      : searchProps.filteredData.sort(function (a, b) {
          if (a.name < b.name) return -1;
          else if (a.name == b.name) return 0;
          else return 1;
        });
    sortedName.reverse();
    searchedData
      ? setSearchedData([...sortedName])
      : setPropsData([...sortedName]);
  };

  const yearAscending = () => {
    sortedName = searchedData
      ? searchedData.sort(function (a, b) {
          return new Date(a.Date) - new Date(b.Date);
        })
      : searchProps.filteredData.sort(function (a, b) {
          return (
            new moment(a.Date).format("DD/MM/YYYY") -
            new moment(b.Date).format("DD/MM/YYYY")
          );
        });
    searchedData
      ? setSearchedData([...sortedName])
      : setPropsData([...sortedName]);
  };
  const yearDescending = () => {
    sortedName = searchedData
      ? searchedData.sort(function (a, b) {
          return new Date(b.Date) - new Date(a.Date);
        })
      : searchProps.filteredData.sort(function (a, b) {
          return new Date(b.Date) - new Date(a.Date);
        });
    searchedData
      ? setSearchedData([...sortedName])
      : setPropsData([...sortedName]);
  };
  const handleChange = (e) => {
    setSearchedData(
      searchProps.objs.filter((item) =>
        item.name.toLowerCase().includes(e.target.value)
      )
    );
  };

  const pageNumbers = [];

  for (
    let i = 1;
    i <=
    Math.ceil(
      searchedData
        ? searchedData.length / postsPerPage
        : searchProps.filteredData.length / postsPerPage
    );
    i++
  ) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const showButton = () => {
    setShowButtons(!showButtons);
  };

  return (
    <div className="listpage">
      <div className="listpage__navbar">
        <Link to={`/`}>
          <img className="listpage__logo" alt="tesodev logo" src={logo}></img>
        </Link>

        <div className="listpage__search">
          <div className="search__container">
            <input
              defaultValue={searchProps.value}
              onChange={handleChange}
              className="search__input"
            ></input>
          </div>
          <Link to={`/search`}>
            <button className="search__btn">Search</button>
          </Link>
        </div>
        <Link to={`/addlink`}>
          <button className="listpage__btn">Add new record</button>
        </Link>
      </div>
      <div className="listpage__container">
        <div className="listpage__searchedList">
          {currentPosts?.map((item) => {
            return (
              <div className="listpage__wrapper">
                <div className="listpage__listItem">
                  <div className="listpage__info">
                    <div>
                      <img
                        className="listpage__icon"
                        alt="location icon"
                        src={locationmark}
                      ></img>
                    </div>
                    <div>
                      <p className="listpage__name">{item.name}</p>
                      <p className="listpage__country">{`${item.City}, ${item.Country}`}</p>
                    </div>
                  </div>

                  <div className="listpage__info2">
                    <p className="listpage__company">{item.company}</p>
                    <p className="listpage__date">{item.Date}</p>
                  </div>
                </div>
                <hr></hr>
              </div>
            );
          })}
          <div className="listpage__main">
        <ul className="listpage__pagination">
          {pageNumbers.map((number) => (
            <li onClick={() => paginate(number)} key={number} className="listpage__pages">
              <div >{number}</div>
            </li>
          ))}
        </ul>
      </div>
        </div>

        <div className="listpage__buttons">
          <div onClick={showButton} className="listpage__orderby">
            <img alt="orderby icon" src={orderbyIcon}></img>
            Order By
          </div>
          <div className={
              showButtons
                ? "listpage__ascending__container"
                : "listpage__ascending__container-hidden"
            }>
            <button
            className={
              showButtons
                ? "listpage__ascending__btn"
                : "listpage__ascending__btn-hidden"
            }
            onClick={ascending}
          >
            Name Ascending
          </button>
          <button
            className={
              showButtons
                ? "listpage__ascending__btn"
                : "listpage__ascending__btn-hidden"
            }
            onClick={descending}
          >
            Name Descending
          </button>
          <button
            className={
              showButtons
                ? "listpage__ascending__btn"
                : "listpage__ascending__btn-hidden"
            }
            onClick={yearAscending}
          >
            Year Ascending
          </button>
          <button
            className={
              showButtons
                ? "listpage__ascending__btn"
                : "listpage__ascending__btn-hidden"
            }
            onClick={yearDescending}
          >
            Year Descending
          </button>
          </div>
          
        </div>
      </div>

      
    </div>
  );
}

export default Search;
