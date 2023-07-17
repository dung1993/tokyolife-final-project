import React, { useState, useRef, useEffect, Component } from "react";

const FormInput = (props) => {
  const {label,onChange,errorsMessage,...inputProps} = props
  const [focused,setFocused] = useState(false)
  const handleFocus = (e) =>{
    setFocused(true)
  }
  return (
    <>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">
          {label}
        </label>
        <input className="form-control" {...inputProps} onChange={onChange} onBlur={handleFocus} focused={focused.toString()}
        />
          <span className="errors">{errorsMessage}</span>
        
      </div>

     
     
    </>
  );
};
export default FormInput;
