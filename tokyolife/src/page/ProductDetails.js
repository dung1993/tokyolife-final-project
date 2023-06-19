import React, { useState,useRef, useEffect,Component } from "react";

import { Container, Row, Col } from "reactstrap";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import Slider from "react-slick";
import "../component/Style/product-details.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";





Fancybox.bind('[data-fancybox="gallery"]', {
    // Your custom options
});


const ProductDetails = () => {
    document.title = 'N2D shop - Product Detail';
    const [product, setProduct] = useState({});
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
    const sliderRef = useRef(null);
    useEffect(() => {
        try {
            fetch(`http://localhost:8086/api/products/9`)
            .then(async (response)=>{
                let product = await response.json();
                setProduct(product)
            })
            
        } catch (error) {
            console.log('error product');
        }
    }, []);

    const handleTab = (index)=>{
        if(sliderRef.current){
            sliderRef.current.slickGoTo(index)
        }
       
    }

  
    return <>
        <div className="productDetail">
            <Container>
                <section className="productDetail-information" key={product.id}>
                    <Container>
                        <Row className="top-container" >
                            <Col lg="12" md="12" className="d-flex" >
                                <ul className="breadcrumb-list">
                                    <li><a>Trang chu </a><span>&nbsp;&nbsp;</span></li><span>&#47;&nbsp;&nbsp;&nbsp;</span>
                                    <li><a href="#">{product.categoryName}</a><span>&nbsp;&nbsp;</span></li><span>&#47;&nbsp;&nbsp;&nbsp;</span>
                                    <li><a href="#">{product.title}</a></li><span>&nbsp;</span>
                                    <li><a href="#">{product.code}</a></li>
                                </ul>
                                </Col>
                        </Row>
                        <Row>
                            <Col lg="6" md="6" className="productDetail-gallery d-flex">
                                <Col lg="2" md="2" className="d-flex flex-column">                                  
                                    {product.images?.map((data, index)=>(
                                        <a>
                                        <img onClick={()=>handleTab(index)}  src={data.fileUrl} alt="" className="image-product-list" />
                                        </a>   
                                    ))}
                                
                                </Col>
                                <Col lg="10" md="10">
                                    <Slider ref={sliderRef} {...settings}>
                                            {product.images?.map((data)=>(
                                                <a data-fancybox="gallery" href={data.fileUrl}>
                                                    <img  src={data.fileUrl} alt="" style={{maxWidth:'100%' }} />
                                                </a>   
                                                ))}
                                    </Slider>
                                </Col>

                                
                            
                            </Col>
                            <Col lg="6" md="6" className="productDetail-content">
                                <div className="product__detail">
                                    <div className="product-heading">
                                        <h1>{product.title}</h1>
                                        <ul className="product-meta">
                                            <li className="pro-sku">Mã sản phẩm: <span>{product.code}</span> </li>
                                            <li>&#124;</li>
                                            <li className="pro-brand">Thương hiệu: <span>{product.brandName}</span></li>
                                            <li>&#124;</li>
                                            <li className="pro-sharing">
                                                
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="product-price" id="price-preview">
                                        <span className="pro-percen me-2">-50%</span>
                                        <del>600,000đ</del>
                                        <span className="pro-price ms-2">{product.price}đ</span>
                                    </div>
                                    <div className="product-variants">
                                        <form action="/cart/add" className="variants" id="add-item-form">
                                            <div className="select-swatch">
                                                <div className="swatch">
                                                    <div className="title-swap">
                                                        Màu sắc: <strong></strong>
                                                    </div>
                                                    <div className="select-swap">

                                                    </div>
                                                </div>
                                                <div className="swatch">
                                                    <div className="title-swap">
                                                        Size: <strong></strong>
                                                    </div>
                                                    <div className="select-swap">

                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="product-description">
                                        <div className="panel-group ">
                                            <div className="panel-title">
                                                <h2>Thông tin sản phẩm</h2>
                                            </div>
                                        </div>
                                        <div className="panel-description ">
                                            <div className="description-productdetail">
                                                <p>{product.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </Container>
        </div>
    </>

}

export default ProductDetails