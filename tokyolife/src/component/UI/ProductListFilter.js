import React from "react";
import ProductCard from "./ProductCard";
import { Col } from "react-bootstrap";


const ProductsListFilter = ({ products }) => {


    return <>
        {
            products?.map(product => { return <Col lg="3" md="4"><ProductCard key={Math.random() + "H123"} product={product} /></Col> })

        }
    </>
}

export default ProductsListFilter