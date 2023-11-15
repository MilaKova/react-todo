import React from "react";

const InputWithLabel = ({id, value, type='text', onChange, children, isFocused}) => {
    const inputRef = React.useRef();

    React.useEffect(() => {
      if (isFocused) {
        inputRef.current.focus();
      }
    }, [isFocused]);
    
    return(
      <>
       <label htmlFor='todoTitle'>{children}</label>
       <input 
        id={id} 
        type={type} 
        value={value} 
        onChange={onChange}
        ref={inputRef}>
      </input>
      </>
    )
};


export default InputWithLabel;