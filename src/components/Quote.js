import React, {useEffect, useState} from "react";
import styles from "./Quote.module.css"

function Quote() {
  const [quote, setQuote] = useState("");

  const newQuote = () => {
    fetch("https://type.fit/api/quotes")
      .then((res) => res.json())
      .then((data) => {
        let randomNum = Math.floor(Math.random() * data.length);
        setQuote(data[randomNum]);
      });
  };
  useEffect(() => {
    newQuote();
  }, []);

  return (
    <div className={styles.container_quote}>
      <div className="quote">
        <h1>
          <span className="material-symbols-outlined">notifications</span>{" "}
          Reminder
        </h1>
        <p>{quote.text}</p>
      </div>
    </div>
  );
}
export default Quote;