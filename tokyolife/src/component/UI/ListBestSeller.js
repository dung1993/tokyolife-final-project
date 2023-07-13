import React, { useState } from "react";
import { Col } from "react-bootstrap";
import Slider from "react-slick";
import ProductCard from "./ProductCard.js";


const ListBestSeller = ({ productsRes }) => {


    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1
    };

    return (
        <div className="list-bestseller">
            {
                productsRes?.map(productsRes => productsRes.length > 0 ? <>
                    <Slider {...settings}>
                        {productsRes && productsRes?.map(product => <ProductCard key={Math.random() + "H123"} product={product} />)}
                    </Slider>

                </> : <></>

                )

            }
        </div>


    )
}
export default ListBestSeller