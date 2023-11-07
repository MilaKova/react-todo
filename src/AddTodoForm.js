import React,{useState} from "react";

function AddTodoForm({onAddTodo}){
  const [todoTitle, setTodoTitle] = useState("");
  
  const handleTitleChange = (e) =>{
    const newTodoTitle = e.target.value
    setTodoTitle(newTodoTitle)   
  };
  
  const handleAddTodo = (e) => {
    e.preventDefault()
    onAddTodo({
      id: Date.now(),
      title: todoTitle
    })
    setTodoTitle("")
  };

  return(
    <form onSubmit={handleAddTodo}>
      <label htmlFor='todoTitle'>Title</label>
      <input id='todoTitle' type='text' name='title' value={todoTitle} onChange={handleTitleChange}></input>
      <button type="submit">Add</button>
    </form>
  )
};

export default AddTodoForm;