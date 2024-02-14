import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import styles from'./App.module.css';
import TodoContainer from './components/TodoContainer';
import Today from './components/Today';


function App() {
  return (
    <BrowserRouter>
      <Today />

      <Routes>
        <Route path="/" element={<TodoContainer />} />
        <Route path="/new" element={<h1>New Todo List</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
