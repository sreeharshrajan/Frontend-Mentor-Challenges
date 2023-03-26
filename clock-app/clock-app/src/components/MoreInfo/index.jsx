import React, { useState, useEffect, useContext } from "react";
import {MoreInfoContainer} from "./MoreInfoComponents"
import DarkModeContext from "../../utils/dark-mode-context";
import classes from "./MoreInfo.module.css";

const MoreInfo = (props) => {
  const darkMode = useContext(DarkModeContext);

  const [timezone, setTimezone] = useState(null);
  const [dayOfTheYear, setDayOfTheYear] = useState(null);
  const [dayOfTheWeek, setDayOfTheWeek] = useState(null);
  const [weekNumber, setWeekNumber] = useState(null);

  useEffect(() => {
    if (props.data) {
      setTimezone(props.data.timezone);
      setDayOfTheYear(props.data["day_of_year"]);
      setDayOfTheWeek(props.data["day_of_week"]);
      setWeekNumber(props.data["week_number"]);
    }
  }, [props.data]);

  return (
    <MoreInfoContainer
      className={`${darkMode && classes["dark-mode"]} ${props.moreInfoActive ? "" : classes["display-none"] }`}
    >
      <div
        className={`${classes["second-container"]} ${darkMode && classes["dark-mode"]
          }`}
      >
        <div className={classes["third-container"]}>
          <h6 className={classes.title}>CURRENT TIMEZONE</h6>
          <h2 className={classes.information}>{timezone}</h2>
          <h6 className={classes.title}>DAY OF THE YEAR</h6>
          <h2 className={classes.information}>{dayOfTheYear}</h2>
        </div>
        <div className={classes["third-container"]}>
          <h6 className={classes.title}>DAY OF THE WEEK</h6>
          <h2 className={classes.information}>{dayOfTheWeek}</h2>
          <h6 className={classes.title}>WEEK NUMBER</h6>
          <h2 className={classes.information}>{weekNumber}</h2>
        </div>
      </div>
    </MoreInfoContainer>
  );
};

export default MoreInfo;