import { React, useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import "../component/Style/checkout.css";
import { useForm } from "react-hook-form"
const Checkout = ()=>{
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()
    
      const onSubmit = (data) => console.log(data)
      console.log(watch("example"))
    return(
        <>
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <input defaultValue="test" {...register("example")} />

      {/* include validation with required or other standard HTML validation rules */}
      <input {...register("exampleRequired", { required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && <span>This field is required</span>}

      <input type="submit" />
    </form>
        </>
    )
}
export default Checkout