import React from "react";
import Slider from "react-slick";
import ProductCard from "./ProductCard.js";


const ListBestSeller = ({ productsBestseller }) => {

    console.log("aaaa", productsBestseller);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1
    };

    return (
        <div className="list-bestseller">
            <Slider key={Math.random() + "H123"} {...settings}>
                {productsBestseller?.map(product => {
                    return <ProductCard key={Math.random() + "H123"} product={product} />
                })}
            </Slider>





        </div>


    )
}
export default ListBestSeller