import React, {useState, useEffect} from "react";
import styles from "./Today.module.css"
 
function Today() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setInterval(() => setTime(new Date()), 1000);
  }, []);

  const currentTime = time.toLocaleTimeString(["en-US"], {
    hour: "numeric",
    minute: "numeric",
  });

  const date = time.toLocaleString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className={styles.today}>
      <h2>{currentTime}</h2>
      <h3>{date}</h3>
    </div>
  );
}
export default Today;