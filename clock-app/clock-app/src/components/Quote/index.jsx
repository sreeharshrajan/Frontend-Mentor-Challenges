import React, { useState, useContext } from "react";

import DarkModeContext from "../../utils/dark-mode-context";
import classes from "./Quote.module.css";
import IconRefresh from "../../assets/desktop/icon-refresh.svg";

const Quote = (props) => {
  const darkMode = useContext(DarkModeContext);

  const [quote, setQuote] = useState({
    content:
      "“The science of operations, as derived from mathematics more especially, is a science of itself, and has its own abstract truth and value.”",
    author: "Ada Lovelace",
  });

  const fetchQuote = async () => {
    try {
      const response = await fetch("https://api.quotable.io/random");
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      setQuote(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div
      className={`${classes.container}  ${props.quoteActive ? "" : classes["display-none"]
        }`}
    >
      <div className={classes["quote-container"]}>
        <p className={`${classes.quote} ${darkMode && classes["dark-mode"]}`}>
          {quote.content}
        </p>
        <img
          onClick={fetchQuote}
          className={classes.icon}
          src={IconRefresh}
          alt="icon to refresh quotes"
        />
      </div>
      <h5 className={`${classes.author} ${darkMode && classes["dark-mode"]}`}>
        {quote.author}
      </h5>
    </div>
  );
};

export default Quote;