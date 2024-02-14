import React, {useState, useEffect} from 'react';
import TodoList from'../components/TodoList.js';
import AddTodoForm from '../components/AddTodoForm';
import styles from'./TodoContainer.module.css';
import Quote from './Quote.js';
import PropTypes from 'prop-types';

function TodoContainer({tableName}) {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [ascending, setAscending] = useState(false);

  const fetchData = async () => {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_TOKEN}`,
      },
    };
    const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}`;
    
    // Sort by Airtable field
    //const url = `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/${process.env.REACT_APP_TABLE_NAME}?view=Grid%20view&sort[0][field]=title&sort[0][direction]=asc`
    


    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        const message = `Error: ${response.status}`;
        throw new Error(message);
      }

      const data = await response.json();

      //sort in alphabetical order with JavaScript
      ascending
      ? data.records.sort((objectA, objectB) => {
        if(objectA.fields.title.toUpperCase() < objectB.fields.title.toUpperCase())return -1
        else if (objectA.fields.title.toUpperCase() === objectB.fields.title.toUpperCase())return 0
        else return 1
      })
      : data.records.sort((objectA, objectB) => {
        if(objectA.fields.title.toUpperCase() < objectB.fields.title.toUpperCase())return 1
        else if (objectA.fields.title.toUpperCase() === objectB.fields.title.toUpperCase())return 0
        else return -1
        })

      const todos = data.records.map((todo) => {
        const newTodo = {
          id: todo.id,
          title: todo.fields.title,
          completedAt: todo.createdTime,
        };
        return newTodo;
      });

      setTodoList(todos);
      setIsLoading(false);
      setIsError(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [tableName, ascending]);

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
        id: responseData.id,
        title: responseData.fields.title,
      };

      setTodoList([...todoList, newTodo]);
    } catch (error) {
      console.log(error.message);
      return null;
    }
  };

  const removeTodo = async (id) => {
    try {
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

      const newTodoList = todoList.filter((item) => item.id !== id);
      setTodoList(newTodoList);
    } catch (error) {
      console.log(error.message);
      return null;
    }
  };
  return (
    <div className={styles.container}>
    <Quote/>

      <div className={styles.todo_container}>
        <h1>
          <span className="material-symbols-outlined">select_check_box</span> to do
        </h1>
        <AddTodoForm onAddTodo={addTodo} />

        {isError && <p>Something went wrong</p>}

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            
          <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
          <label>A-to-Z</label>

            <input
              id="switch"
              type="checkbox"
              checked={ascending}
              onChange={() => setAscending(!ascending)}
              />             
               </>
        )}
      </div>
    </div>
  );
}

TodoContainer.propTypes = {
  tableName: PropTypes.string
}

export default TodoContainer;