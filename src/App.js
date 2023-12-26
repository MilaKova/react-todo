import React, {useState, useEffect} from 'react';
import TodoList from'./TodoList.js';
import AddTodoForm from './AddTodoForm';


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
      console.log("data:", data);
      const todos= data.records.map((todo)=>{
        const newTodo = {
          id: todo.id,
          title: todo.fields.title,
          completedAt: todo.createdTime,             
        }
        return newTodo;          
      });
      console.log("todos:", todos);

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
      // console.log("airtableData:", airtableData)

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
