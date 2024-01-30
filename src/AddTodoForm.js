import React,{useState} from "react";
import InputWithLabel from "./InputWithLabel";
import styles from "./AddTodoForm.module.css"

function AddTodoForm({onAddTodo}){
  const [todoTitle, setTodoTitle] = useState("");
  
  const handleTitleChange = (e) =>{
    const newTodoTitle = e.target.value
    setTodoTitle(newTodoTitle)   
  };
  
  const handleAddTodo = (e) => {
    e.preventDefault();
    if (todoTitle !== ""){
    const newTodo = {
      id: Date.now(),
      title: todoTitle,
    };
    onAddTodo(newTodo);
    setTodoTitle("");
  }
  };

  return(
    <form onSubmit={handleAddTodo} className={styles.form}>

      <InputWithLabel
       id='todoTitle'
       value={todoTitle}
       onChange={handleTitleChange}>

      </InputWithLabel>

      <button className={styles.button}type="submit">Add</button>
    </form>
  )
};

export default AddTodoForm;