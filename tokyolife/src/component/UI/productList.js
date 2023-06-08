import React from "react";

import Slider from "react-slick";
import products from "../../assets/data/products";

import ProductCard from "./productCard";

const ProductList = () => {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 1
    };

    return <Slider {...settings}>
                {products?.map((product) => (
                        <ProductCard product={product} />
                ))}
    </Slider>
}

export default ProductList