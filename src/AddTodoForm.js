import React from "react";

function AddTodoForm(props){
  function handleAddTodo(e){
    e.preventDefault()
    const todoTitle = e.target.title.value
    console.log(todoTitle)
    props.onAddTodo(todoTitle)

    e.target.reset()
  }
    return(
      <form onSubmit={handleAddTodo}>
        <label htmlFor='todoTitle'>Title </label>
        <input id='todoTitle' type='text' name='title'></input>
        <button type="submit">Add</button>
       </form>
    )
}
export default AddTodoForm