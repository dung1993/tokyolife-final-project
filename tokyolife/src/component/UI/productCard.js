import React from "react";
import { Link } from "react-router-dom";
import "../Style/products_card.css"



const ProductCard = ({ product }) => {



    return (
        product.id && <Link key={product.id.toString()} to={`/productdetails/${product.id}`} state={{ id: product.id }}>
            <div className="product__item ">
                <div className="product__image d-flex justify-content-center mb-2">
                    <img src={product.avatar?.fileUrl} alt="" />
                </div>

                <span className="brand text-secondary">{product.brand?.name}</span>
                <h3 className="product__name mt-2">{product.title}</h3>
                <span className="price text-danger me-3">{product.price}đ</span>
                <span className="raw_price text-black-50 text-decoration-line-through">{product.price}đ</span>
            </div>
        </Link>
    )


}

export default ProductCard