import React from "react";
import styles from "./AddTodoForm.module.css";
import PropTypes from 'prop-types';

const InputWithLabel = ({id, value, type='text',onChange, children, isFocused}) => {
    const inputRef = React.useRef();

    React.useEffect(() => {
      if (isFocused) {
        inputRef.current.focus();
      }
    }, [isFocused]);
    
    return(
      <>
       <label htmlFor='todoTitle'>{children}</label>
       <input className={styles.input}
        id={id} 
        type={type} 
        value={value} 
        onChange={onChange}
        ref={inputRef}>
      </input>
      </>
    )
};

InputWithLabel.propTypes = {
  id: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.object,
  onChange: PropTypes.func,
}


export default InputWithLabel;