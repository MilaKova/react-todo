import React from 'react';
import TodoList from'./TodoList.js'
import AddTodoForm from './AddTodoForm';


function App() {
  const [newTodo, setNewTodo]=React.useState("");
  return (
    <div style={{ textAlign: 'center',}}>
      <header>          
        <h1>Todo list</h1> 
      </header>

      <AddTodoForm onAddTodo={setNewTodo}/>

      <p>{newTodo}</p>

      <TodoList />       
    </div>
  );
}

export default App;
