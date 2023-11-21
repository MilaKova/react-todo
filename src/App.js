import React,{useState} from 'react';
import TodoList from'./TodoList.js';
import AddTodoForm from './AddTodoForm';

const useSemiPersistentState = () => {
  const[todoList, setTodoList]= useState(
    JSON.parse(localStorage.getItem('savedTodoList')) || []);
   
    React.useEffect(() => {
      localStorage.setItem('savedTodoList', JSON.stringify(todoList))
    },[todoList])

    return [todoList, setTodoList];
}

function App() {

  const[todoList, setTodoList] = useSemiPersistentState();

  const removeTodo = (id)=> {
    const newTodo = todoList.filter(
      (todoList)=>id !==todoList.id
    )
   setTodoList(newTodo);
  }

  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo])
  };

  return (
    <>  
      <h1>Todo list</h1>      
      <AddTodoForm onAddTodo={addTodo}/>
      <TodoList todoList={todoList} onRemoveTodo={removeTodo}/>  
    </>
  );
};

export default App;
