import React from "react";
import '../Helmet/helmet.css'

const Helmet = (props) =>{
    document.title = 'N2D shop -' + props.title
    return (
        <div className="w-100 bg-body">{props.children}</div>
    )
}
export default Helmet