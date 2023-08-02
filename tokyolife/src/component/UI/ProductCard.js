import React from "react";
import { Link } from "react-router-dom";
import "../Style/products_card.css"
import { FormattedNumber } from "react-intl";


const ProductCard = ({ product }) => {



    return (
        product.id && <Link key={product.id.toString()} to={`/chi-tiet-san-pham/${product.id}`} state={{ id: product.id }} >


            <div className="product__item ">
                <div className="product__image d-flex justify-content-center mb-2">
                    <img src={product?.avatar} alt="" />
                    {product?.percent > 0 && <div className="product-discount">-{product?.percent}%</div>}
                </div>

                <span className="brand text-secondary">{product?.brand}</span>
                <h3 className="product__name mt-2">{product?.title}</h3>
                {product?.percent > 0 &&
                    <span className="price text-danger me-3" >
                        <FormattedNumber
                            value={product?.priceDiscount}
                            style="currency"
                            currency="VND"
                            minimumFractionDigits={0}
                        />
                    </span>}
                {product?.percent > 0 &&
                    <span className="raw_price text-black-50 text-decoration-line-through" >
                        <FormattedNumber
                            value={product?.price}
                            style="currency"
                            currency="VND"
                            minimumFractionDigits={0}
                        />
                    </span>}
                {product?.percent == 0 &&
                    <span className="raw_price text-black" >
                        <FormattedNumber
                            value={product?.price}
                            style="currency"
                            currency="VND"
                            minimumFractionDigits={0}
                        />
                    </span>}
            </div>
        </Link>



    )


}

export default ProductCard