import React from "react";
import ProductCard from "./ProductCard";
import { Col } from "react-bootstrap";


const ProductsListFilter = ({ products }) => {


    return <>
        {products.length > 0 && products?.map(product => { return <Col style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "10px" }} lg="3" md="4"><ProductCard key={Math.random() + "H123"} product={product} /></Col> })}
        {products.length === 0 && <Col><p>Không tìm thấy kết quả. Vui lòng thử lại!</p></Col>}

    </>
}

export default ProductsListFilter