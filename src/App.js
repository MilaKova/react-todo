import React from 'react';

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
      title:"Learn React",
      id:4,
  },
  {
     title:"Read a book for 30 min",
     id:5,
  }
]

function App() {
  return (
    <div style={{ textAlign: 'center',}}>
      <header>          
        <h1>Todo list</h1> 
      </header>
     
      {
        <ul style={{listStyleType: 'none',}}>

          {todoList.map((item)=> {
          return <li>{item.id}. {item.title}</li>;
          })}

        </ul>
      }
      
    </div>
  );
}

export default App;
