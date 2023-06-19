import React from "react";

import Slider from "react-slick";

import Banner from "./banner";

const BannerList = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 900,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    var banners = [<Banner />, <Banner />, <Banner />]

    return <Slider {...settings}>
        {banners?.map((value) => (
            value
        ))}
    </Slider>
}

export default BannerList