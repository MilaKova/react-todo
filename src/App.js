import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import styles from'./App.module.css';
import TodoContainer from './components/TodoContainer';

function App() {
  const date = new Date();
  const showTime = date.toLocaleTimeString("it-IT", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };
  const curentDate = date.toLocaleString("en-US", options);

  return (
    <BrowserRouter>
      <div className={styles.showTime}>
        <h2>{showTime}</h2>
        <h3>{curentDate}</h3>
      </div>

      <Routes>
        <Route path="/" element={<TodoContainer />} />
        <Route path="/new" element={<h1>New Todo List</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
