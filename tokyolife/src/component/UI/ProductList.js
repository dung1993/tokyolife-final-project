import React, { useState, useEffect } from "react";

import Slider from "react-slick";
import Products from "../../assets/data/products";

import ProductCard from "./ProductCard";

const ProductList = () => {

  const [state, setState] = useState({
    products: []
  })

  useEffect(() => {
    console.log('useEffectuseEffect');
    try {
      setState({ ...state });
      async function getData() {
        let productRes = await Products.getProduct();
        console.log(productRes.data);
        setState({
          ...state,
          products: productRes.data,
        })
      }

      getData();
    } catch (error) {

    }
  }, [])



  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
  };

  const { products } = state;

  return <Slider {...settings}>
    {products.map(product => {
      console.log('chay')
      return <ProductCard key={product.id.toString() + "productlist"} product={product} />
    })}
  </Slider>
}

export default ProductList