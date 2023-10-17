import React from 'react';
import TodoList from'./TodoList.js'
import AddTodoForm from './AddTodoForm';



function App() {
  return (
    <div style={{ textAlign: 'center',}}>
      <header>          
        <h1>Todo list</h1> 
      </header>

      <AddTodoForm />
    
      <TodoList />       
    </div>
  );
}

export default App;
