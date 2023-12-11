import React, {useState, useEffect} from 'react';
import TodoList from'./TodoList.js';
import AddTodoForm from './AddTodoForm';


function App() {

  const [todoList, setTodoList]= useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

    useEffect(() => {
      new Promise (function(resolve, reject){
        setTimeout(() => {
          resolve({
            data: {
              todoList:JSON.parse(localStorage.getItem('savedTodoList')) || []
            }
            })
        },2000)
      })
      .then (result => {
        setTodoList(result.data.todoList);
        setIsLoading(false);
      })
      .catch(()=>setIsError(true));
    },[]);
  

    useEffect(() => {
      if (isLoading === false) 
      localStorage.setItem('savedTodoList', JSON.stringify(todoList))
    },[todoList, isLoading])


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

      {isError && <p>Something went wrong</p>}

      {isLoading ? (
        <p>Loading...</p>
      ) : (
      <TodoList todoList={todoList} onRemoveTodo={removeTodo}/>
      )}
    </>
  );
};

export default App;
