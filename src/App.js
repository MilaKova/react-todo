import React,{useState} from 'react';
import TodoList from'./TodoList.js';
import AddTodoForm from './AddTodoForm';

function App() {

  const[todoList, setTodoList]=useState([]);

  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo])
  };

  return (
    <div style={{ textAlign: 'center',}}>  
      <h1>Todo list</h1>      
      <AddTodoForm onAddTodo={addTodo}/>
      <TodoList todoList={todoList} />  
    </div>
  );
};

export default App;
