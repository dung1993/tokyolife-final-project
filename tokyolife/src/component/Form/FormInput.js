import React, { useState, useRef, useEffect, Component } from "react";

const FormInput = (props) => {
  const {label,onChange,errorsMessage,...inputProps} = props
  return (
    <>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">
          {label}
        </label>
        <input className="form-control" {...inputProps} onChange={onChange}
        />
          <span className="errors">{errorsMessage}</span>
        
      </div>

     
     
    </>
  );
};
export default FormInput;
