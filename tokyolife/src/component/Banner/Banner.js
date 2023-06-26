import React from "react";

import bannerImg from "../../assets/images/banner1.webp";
import { Link } from "react-router-dom";
import "./banner.css"

const Banner = () => {
    return <Link>
        <div className="hero__img">
            <img src={bannerImg} alt="" style={{ width: "100%" }} />
        </div>
    </Link>


}

export default Banner