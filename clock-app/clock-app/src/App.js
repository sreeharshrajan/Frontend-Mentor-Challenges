import React, { useState, useEffect } from "react";
import  GlobalStyles from './styles/GlobalStyles'
import Quote from "./components/Quote";
import Clock from "./components/Clock";
import MoreInfo from "./components/MoreInfo";
import DarkModeContext from "./utils/dark-mode-context";
import "./styles/App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [data, setData] = useState(null);
  const [quoteActive, setQuoteActive] = useState(true);
  const [moreInfoActive, setMoreInfoActive] = useState(false);

  const fetchClockHandler = async () => {
    try {
      const response = await fetch("http://worldtimeapi.org/api/ip", {
        referrerPolicy: "unsafe-url",
      });
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      setData(data);
      const datetime = data.datetime;
      const date = new Date(datetime);
      const hour = date.getHours();
      hour > 5 && hour < 18 ? setDarkMode(false) : setDarkMode(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchClockHandler();
  }, [fetchClockHandler]);

  const showMoreInfo = () => {
    setQuoteActive(false);
    setMoreInfoActive(true);
  };

  const showQuote = () => {
    setMoreInfoActive(false);
    setQuoteActive(true);
  };

  return (
    <DarkModeContext.Provider value={darkMode}>
      <GlobalStyles />
      <main className={darkMode ? "dark-mode" : ""}>
        <Quote quoteActive={quoteActive} />
        <Clock
          onMoreClicked={showMoreInfo}
          onLessClicked={showQuote}
          quoteActive={quoteActive}
          moreInfoActive={moreInfoActive}
          data={data}
        />
        <MoreInfo moreInfoActive={moreInfoActive} data={data} />
      </main>
    </DarkModeContext.Provider>
  );
}

export default App;