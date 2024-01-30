import React from "react";
import styles from "./TodoListItem.module.css"

function TodoListItem({item, onRemoveTodo}){
   return(
    <li className={styles.ListItem}> 
      {item.title}
      <button className={styles.RemoveButton} type="button" onClick={()=> onRemoveTodo(item.id)}>x</button>
    </li>
   )
};

export default TodoListItem;