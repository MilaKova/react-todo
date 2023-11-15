import React,{useState} from "react";
import InputWithLabel from "./InputWithLabel";

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

      <InputWithLabel
       id='todotitle'
       value={todoTitle}
       onChange={handleTitleChange}>

      <>Title: </>
      </InputWithLabel>

      <button type="submit">Add</button>
    </form>
  )
};

export default AddTodoForm;