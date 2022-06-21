import React, { useEffect, useState } from "react";
import logo from "../../assets/tesodevlogo.png";
import arrow from "../../assets/arrow.png";
import "./AddLinkPage.scss";
import { Link } from "react-router-dom";
import data from "../../data.json";

export default function AddLinkPage() {
  var today = new Date();
  const initialValues = { username: "", email: "", country: "", city: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const [isErrorName, setIsErrorName] = useState(false);
  const [isErrorCountry, setIsErrorCountry] = useState(false);
  const [isErrorCity, setIsErrorCity] = useState(false);
  const [isErrorEmail, setIsErrorEmail] = useState(false);
  const [isDisableButton, setIsDisableButton] = useState(true);
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);


    const newData = [
      formValues.username,
      "Tesodev",
      formValues.email,
      today,
      formValues.country,
      formValues.city,
    ];
    data.data.push(newData);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value }, handleSubmit);
  };

  const validate = (values) => {
    const errors = {};

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const re = /^[A-Za-z]+$/;
    if (!values.username) {
      errors.username = "Username is required!";
      setIsErrorName(true);
    } else if (!re.test(values.username)) {
      errors.username = "This is not a valid name format!";
      setIsErrorName(true);
    } else if (values.username.length < 4) {
      errors.username = "Name must be more than 4 characters";
      setIsErrorName(true);
    } else if (values.username.length > 60) {
      errors.username = "Name cannot exceed more than 60 characters";
      setIsErrorName(true);
    }
    if (!values.email) {
      errors.email = "Email is required!";
      setIsErrorEmail(true);
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
      setIsErrorEmail(true);
    }
    if (!values.country) {
      errors.country = "Country is required";
      setIsErrorCountry(true);
    } else if (values.country.length < 2) {
      errors.country = "Country must be more than 4 characters";
      setIsErrorCountry(true);
    } else if (values.country.length > 40) {
      errors.country = "Country cannot exceed more than 60 characters";
      setIsErrorCountry(true);
    }
    if (!values.city) {
      errors.city = "City is required";
      setIsErrorCity(true);
    } else if (values.city.length < 2) {
      errors.city = "City must be more than 4 characters";
      setIsErrorCity(true);
    } else if (values.city.length > 40) {
      errors.city = "City cannot exceed more than 60 characters";
      setIsErrorCity(true);
    }
    return errors;
  };

  useEffect(() => {
    if (
      formValues.city !== "" &&
      formValues.country !== "" &&
      formValues.username !== "" &&
      formValues.email !== ""
    ) {
      setIsDisableButton(false);
    } else {
      setIsDisableButton(true);
    }
  }, [formValues]);

  return (
    <div className="addlink">
      <div className="addlink__navbar">
        <Link to={`/`} className="addlink__logo__wrapper">
          <img className="addlink__logo" alt="tesodev logo" src={logo}></img>
        </Link>

        <Link to={`/`} className="addlink__link">
          <div className="addlink__return">
            <img className="addlink__arrow" alt="arrow icon" src={arrow}></img>
            <h1 className="addlink__header">Return to List Page</h1>
          </div>
        </Link>
      </div>

      <div className="addlink__container">
        <form className="addlink__form" onSubmit={handleSubmit}>
          <label className={isErrorName ? "error__label" : "addlink__label"}>
            Name Surname
            <input
              onChange={(e) => handleChange(e)}
              placeholder="Enter name and surname"
              className={isErrorName ? "error__input" : "addlink__input"}
              type="text"
              name="username"
              id="addlink__id"
              value={formValues.username}
            />
          </label>
          <p className="error__text">{formErrors.username}</p>
          <label className={isErrorCountry ? "error__label" : "addlink__label"}>
            Country
            <input
              onChange={(e) => handleChange(e)}
              placeholder="Enter a country"
              className={isErrorCountry ? "error__input" : "addlink__input"}
              type="text"
              name="country"
              value={formValues.country}
            />
          </label>
          <p className="error__text">{formErrors.country}</p>
          <label className={isErrorCity ? "error__label" : "addlink__label"}>
            City
            <input
              onChange={(e) => handleChange(e)}
              placeholder="Enter a city"
              className={isErrorCity ? "error__input" : "addlink__input"}
              type="text"
              name="city"
              value={formValues.city}
            />
          </label>
          <p className="error__text">{formErrors.city}</p>
          <label className={isErrorEmail? "error__label" : "addlink__label"}>
            Email
            <input
              onChange={(e) => handleChange(e)}
              placeholder="Enter a e-mail (abc@xyz.com)"
              className={isErrorEmail ? "error__input" : "addlink__input"}
              type="text"
              name="email"
              value={formValues.email}
            />
          </label>
          <p className="error__text">{formErrors.email}</p>
          
          <div className="addlink__btn__container">
          <input className={isDisableButton?"disable-button" :"addlink__btn"} disabled={isDisableButton} type="submit" value="Add" />
            
          </div>
        </form>
      </div>

      
      
        {isSubmit
          ? <div className="addlink__alert">
            <div>
              <p className="addlink__alert__header">Error while adding link element</p>
              {Object.values(formErrors).map((item) => <p>{item}</p>)}
            </div>
            <div>
              <div className="addlink__alert__error">
                Error
              </div>
            </div>
              
          </div>
          : null}
      </div>
  );
}
