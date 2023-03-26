import React, { useState, useEffect, useContext } from "react";

import IconSun from "../../assets/desktop/icon-sun.svg";
import IconMoon from "../../assets/desktop/icon-moon.svg";
import IconDown from "../../assets/desktop/icon-arrow-down.svg";
import IconUp from "../../assets/desktop/icon-arrow-up.svg";
import DarkModeContext from "../../utils/dark-mode-context";
import classes from "./Clock.module.css";

const Clock = (props) => {
  const darkMode = useContext(DarkModeContext);

  const [hour, setHour] = useState(null);
  const [minute, setMinute] = useState(null);
  const [second, setSecond] = useState(null);
  const [abbreviation, setAbbreviation] = useState(null);
  const [city, setCity] = useState(null);
  const [country, setCountry] = useState(null);
  const [time, setTime] = useState(null);

  useEffect(() => {
    if (props.data) {
      const datetime = props.data.datetime;
      const date = new Date(datetime);
      setHour(date.getHours());
      setMinute(date.getMinutes());
      setSecond(date.getSeconds());
      setAbbreviation(props.data.abbreviation);
      setTime(newtime);
    }
  }, [props.data]);

  const fetchGeolocation = async () => {
    try {
      const response = await fetch(
        "https://api.ipgeolocation.io/ipgeo?apiKey=3fdb49db8b2049468753bcb6f0e717d0"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      setCity(data.city);
      setCountry(data["country_name"]);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchGeolocation();
  }, []);

  const newtime = () => {
    if (hour && minute) {
      return `${hour}:${minute < 10 ? "0" + minute : minute}:${second}`;
    } else {
      return "";
    }
  };

  const moreClickHandler = () => {
    props.onMoreClicked();
  };

  const lessClickHandler = () => {
    props.onLessClicked();
  };

  return (
    <div className={classes.container}>
      <div className={classes["second-container"]}>
        <div className={classes["greeting-container"]}>
          <img
            src={darkMode ? IconMoon : IconSun}
            alt="An icon with sun or moon"
          />
          <h4 className={classes.greeting}>
            {darkMode ? "GOOD EVENING" : "GOOD MORNING"}
            <span className={classes.span}>, IT'S CURRENTLY</span>
          </h4>
        </div>
        <div className={classes["clock-container"]}>
          <h1 className={classes.clock}>{time}</h1>
          <span className={classes["standard-time"]}>{abbreviation}</span>
        </div>
        <h3 className={classes.location}>
          IN {city}, {country}
        </h3>
      </div>
      <button
        className={`${classes.button} ${props.quoteActive ? "" : classes["display-none"]
          }`}
        onClick={moreClickHandler}
      >
        <span className={classes["button-text"]}>MORE</span>
        <div className={classes.icon}>
          <img src={IconDown} alt="An icon with an arrow" />
        </div>
      </button>
      <button
        className={`${classes.button} ${props.moreInfoActive ? "" : classes["display-none"]
          }`}
        onClick={lessClickHandler}
      >
        <span className={classes["button-text"]}>LESS</span>
        <div className={classes.icon}>
          <img src={IconUp} alt="An icon with an arrow" />
        </div>
      </button>
    </div>
  );
};

export default Clock;