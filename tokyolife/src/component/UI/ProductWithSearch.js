import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductWithSearch = ({ product }) => {
    return <>
        <Container>
            <div className="search_item">
                <div className="search_content">
                    <Link key={product.id.toString()} to={`/productDetails/${product.id}`} state={{ id: product.id }}><p className="text-black">{product?.title}</p></Link>
                    <div className="product-price">
                        {product?.percent > 0 && <span className="price text-danger me-3">{product?.priceDiscount}đ</span>}
                        {product?.percent > 0 && <span className="raw_price text-black-50 text-decoration-line-through">{product?.price}đ</span>}
                        {product?.percent == 0 && <span className="raw_price text-black">{product?.price}đ</span>}
                    </div>
                </div>
                <div className="search_thumbnail">
                    <Link key={product.id.toString()} to={`/productDetails/${product.id}`} state={{ id: product.id }}><img src={product?.avatar} style={{ width: '60px' }} /></Link>
                </div>
            </div>
        </Container>
    </>

}

export default ProductWithSearch