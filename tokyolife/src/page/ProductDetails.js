import React from "react";

import { Container, Row, Col } from "reactstrap";
import products from "../assets/data/products.js"
import { useLocation } from "react-router-dom";
// import CommonSection from "../component/UI/commonSection.js";


const ProductDetails = () => {
    document.title = 'N2D shop - Product Detail';
    let { state } = useLocation();
    const product = products.find(e => e.id === state.id);

    const { imgUrl, productName, price, size, color, brand, description } = product

    return<>
        {/* <CommonSection title={'Product Detail'} /> */}
            <div className="productDetail">
                <Container>
                    <section className="productDetail-information" key={product.id}>
                        <Container>
                            <Row>
                                <Col lg="6" md="6" className="productDetail-gallery">
                                    <div className="product-container-gallery">
                                        <img src={imgUrl} alt="" style={{maxWidth:'100%'}}/>
                                    </div>

                                </Col>
                                <Col lg="6" md="6" className="productDetail-content">
                                    <div className="product__detail">
                                        <div className="product-heading">
                                            <h1>{productName}</h1>
                                            <ul className="product-meta">
                                                <li className="pro-sku">Mã sản phẩm:</li>
                                                <li className="pro-brand">Thương hiệu: <span>{brand}</span></li>
                                                <li className="pro-sharing"></li>
                                            </ul>
                                        </div>
                                        <div className="product-price" id="price-preview">
                                            <span className="pro-percen">-50%</span>
                                            <del>600,000đ</del>
                                            <span className="pro-price">{price}đ</span>
                                        </div>
                                        <div className="product-variants">
                                            <form action="/cart/add" className="variants" id="add-item-form">
                                                <div className="select-swatch">
                                                    <div className="swatch">
                                                        <div className="title-swap">
                                                            Màu sắc: <strong>{color}</strong>
                                                        </div>
                                                        <div className="select-swap">
                                                            
                                                        </div>
                                                    </div>
                                                    <div className="swatch">
                                                        <div className="title-swap">
                                                            Size: <strong>{size}</strong>
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
                                                    <p>{description}</p>
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