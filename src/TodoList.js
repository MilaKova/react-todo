import React from 'react';
import TodoListItem from './TodoListItem';

const todoList = [
    {
        title: "Get up at 6am",
        id:1,
    },
    {
        title:"Drink water",
        id:2,
    },
    {
        title:"Do exercise",
        id:3,
    },
    {
        title:"Learn react",
        id:4,
    },
    {
       title:"Read a book for 30 min",
       id:5,
    }
  ]
  
function TodoList(){
      return(
        <ul style={{listStyleType: 'none',}}>
          {todoList.map((item)=>{
            return <TodoListItem key={item.id} item={item} />
          })}
        </ul>      
      )
    }
export default TodoList;