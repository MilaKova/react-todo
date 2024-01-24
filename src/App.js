import React, {useState, useEffect} from 'react';
import TodoList from'./TodoList.js';
import AddTodoForm from './AddTodoForm';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import styles from'./App.module.css';

function App() {

  const [todoList, setTodoList]= useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchData = async() => {
    const options = 
    {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`
      },
    }
    const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`

    try {
      const response = await fetch (url, options);
    
      if (!response.ok) {
        const message = `Error: ${response.status}`
        throw new Error(message);
      }

      const data = await response.json();
      const todos= data.records.map((todo)=>{
        const newTodo = {
          id: todo.id,
          title: todo.fields.title,
          completedAt: todo.createdTime,             
        }
        return newTodo;          
      });

      setTodoList(todos);
      setIsLoading(false);
      setIsError(false);

    } catch (error){
      console.log(error.message);
      };         
  }; 

  useEffect(() => {
    fetchData()
  },[]);

  const addTodo = async (todo) => {
    try {
      const airtableData = {
        fields: {
        title: todo.title,
        },
      };

      const response = await fetch(
        `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`,

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
          },
          body: JSON.stringify(airtableData),
        }
      );

      if (!response.ok) {
        const message = `Error: ${response.status}`;
        throw new Error(message);
      }

      const responseData = await response.json();
     
        const newTodo = {
         id:responseData.id,
         title:responseData.fields.title,
        }
     
      setTodoList([...todoList, newTodo]);

    } catch (error) {
      console.log(error.message);
      return null;
      }  
  };


  const removeTodo = async(id)=> {
    try{
      const response = await fetch(
        `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}/${id}`,

        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
          },
          
        }
      );

      if (!response.ok) {
        const message = `Error: ${response.status}`;
        throw new Error(message);
      }

      const newTodoList = todoList.filter(
        item => item.id !==id
      )
      setTodoList(newTodoList);

    } catch (error) {
      console.log(error.message);
      return null;
      }  
  };

const date = new Date();
const showTime = date.toLocaleTimeString('it-IT', { 
  hour: '2-digit', 
  minute: '2-digit',  
})

const  options = {
  weekday:'long',
  month:'long',
  day:'numeric',
}
const curentDate = date.toLocaleString('en-US', options)

  return (
    <BrowserRouter>

    <div className={styles.showTime}>
      <h2>{showTime}</h2>
      <h3>{curentDate}</h3>
   </div>
   

    <div className={styles.container}>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h1><span className="material-symbols-outlined">select_check_box</span> to do </h1>
              <AddTodoForm onAddTodo={addTodo} />

              {isError && <p>Something went wrong</p>}

              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
              )}
            </>
          }
        />
        <Route path="/new" element={<h1>New Todo List</h1>} />
      </Routes>
      </div>
    </BrowserRouter>
   );
};

export default App;
