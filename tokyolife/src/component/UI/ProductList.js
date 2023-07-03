import React, { useState } from "react";
import { Col } from "react-bootstrap";
import Slider from "react-slick";
import ProductCard from "./ProductCard.js";


const ProductList = ({ listProductAllRender }) => {

  const [state, setState] = useState({
    products: [],
  })



  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1
  };




  return (
    <div className="category-event">
      {
        listProductAllRender?.map(products => products.length > 0 ? <>
          <img src={products[0]?.category?.avatar} alt="" style={{ width: "100%", height: "250px" }} />
          <Col lg='12' md='12'>
            <h2 className="section__title">{products[0]?.category?.name}</h2>
          </Col>
          <Slider {...settings}>
            {products && products?.map(product => <ProductCard key={Math.random() + "H123"} product={product} />)}
          </Slider>

        </> : <></>

        )

      }
    </div>


  )
}
export default ProductList