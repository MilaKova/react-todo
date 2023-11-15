import React from "react";

function TodoListItem({item, onRemoveTodo}){
   return(
    <li> 
      {item.title}
      <button type="button" onClick={()=> onRemoveTodo(item.id)}>Remove</button>
    </li>
   )
};

export default TodoListItem;