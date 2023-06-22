import React, { useState, useRef, useEffect, Component } from "react";

import { Container, Row, Col } from "reactstrap";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import Slider from "react-slick";
import "../component/Style/product-details.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FormattedNumber } from "react-intl";
import { Link, json, useParams } from "react-router-dom";

Fancybox.bind('[data-fancybox="gallery"]', {
  // Your custom options
});

const ProductDetails = () => {
  const { productId, categoryId } = useParams();

  document.title = "N2D shop - Product Detail";
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const settingsRelatedProduct = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  };
  const sliderRef = useRef(null);

  const [color, setColor] = useState();
  const [size, setSize] = useState();
  const [orderProduct, setorderProduct] = useState({});
  const [visitedProductId, setVisitedProductId] = useState([]);
  const [visitedproduct, setVisitedProduct] = useState([]);

  useEffect(() => {
    try {
      fetch(`http://localhost:8086/api/products/${productId}`).then(
        async (response) => {
          let product = await response.json();
          setProduct(product);
          let newProductId = [...visitedProductId, productId];
          setVisitedProductId(newProductId);
        }
      );
    } catch (error) {
      console.log("error product");
    }
  }, [productId]);

  useEffect(() => {
    localStorage.setItem("visitedproduct", JSON.stringify(visitedProductId));
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem("visitedproduct");
      const array = JSON.parse(saved);
      console.log(array.join("-"));
      const str = array.join("-");

      fetch(`http://localhost:8086/api/products/visited?products=${str}`)
        .then(async (response) => {
          const products = await response.json();
          console.log(products);
        })
        .catch((error) => {
          console.log("Đã xảy ra lỗi:", error);
          // Xử lý lỗi khi gửi yêu cầu hoặc phân tích phản hồi JSON
        });
    } catch (error) {
      console.log("Đã xảy ra lỗi:", error);
    }
  }, [productId]);

  useEffect(() => {
    try {
      if (product && product.categoryId) {
        fetch(
          `http://localhost:8086/api/products/category=${product?.categoryId}`
        ).then(async (response) => {
          let products = await response.json();
          setRelatedProducts(products);
        });
      }
    } catch (error) {
      console.log("error");
    }
  }, [product]);

  useEffect(() => {
    localStorage.setItem("orderProduct", JSON.stringify(orderProduct));
  });

  const handleTab = (index) => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index);
    }
  };

  const handleAddToCart = () => {
    // Cập nhật thuộc tính của `order`
    setorderProduct((prevOrder) => ({
      ...prevOrder,
      id: product.id,
      title: product.title,
      code: product.code,
      categoryName: product.categoryName,
      price: product.price,
      size: size,
      color: color,
    }));
  };

  // const handleUpdateHobby = () => {
  //     // Tìm và thay đổi giá trị của phần tử trong mảng 'hobbies'
  //     const updatedHobbies = data.hobbies.map(hobby => {
  //       if (hobby.id === 1) {
  //         return { ...hobby, name: 'Painting' };
  //       }
  //       return hobby;
  //     });

  //     const newData = { ...data, hobbies: updatedHobbies };
  //     localStorage.setItem('data', JSON.stringify(newData));
  //     setData(newData);
  //   };

  const handleSetSize = (index) => {
    const updatedProductImport = product?.productImportResDTOS?.map((item) => {
      if (item.id == index + 1) {
        setSize(item.size);
      }
      return item;
    });
  };

  const handleSetColor = (index) => {
    const updatedProductImport = product?.productImportResDTOS?.map((item) => {
      if (item.id == index + 1) {
        setColor(item.color);
      }
      return item;
    });
  };

  return (
    <>
      <div className="productDetail">
        <Container>
          <section className="productDetail-information" key={product.id}>
            <Container>
              <Row className="top-container">
                <Col lg="12" md="12" className="d-flex">
                  <ul className="breadcrumb-list">
                    <li>
                      <a>Trang chu </a>
                      <span>&nbsp;&nbsp;</span>
                    </li>
                    <span>&#47;&nbsp;&nbsp;&nbsp;</span>
                    <li>
                      <a href="#">{product.categoryName}</a>
                      <span>&nbsp;&nbsp;</span>
                    </li>
                    <span>&#47;&nbsp;&nbsp;&nbsp;</span>
                    <li>
                      <a href="#">{product.title}</a>
                    </li>
                    <span>&nbsp;</span>
                  </ul>
                </Col>
              </Row>
              <Row>
                <Col lg="6" md="6" className="productDetail-gallery d-flex">
                  <Col lg="2" md="2" className="d-flex flex-column">
                    {product.images?.map((data, index) => (
                      <a>
                        <img
                          onClick={() => handleTab(index)}
                          src={data.fileUrl}
                          alt=""
                          className="image-product-list"
                        />
                      </a>
                    ))}
                  </Col>
                  <Col lg="10" md="10">
                    <Slider ref={sliderRef} {...settings}>
                      {product.images?.map((data) => (
                        <a data-fancybox="gallery" href={data.fileUrl}>
                          <img
                            src={data.fileUrl}
                            alt=""
                            style={{ maxWidth: "100%" }}
                          />
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
                        <li className="pro-sku">
                          Mã sản phẩm: <span>{product.code}</span>{" "}
                        </li>
                        <li>&#124;</li>
                        <li className="pro-brand">
                          Thương hiệu: <span>{product.brandName}</span>
                        </li>
                        <li>&#124;</li>
                        <li className="pro-sharing"></li>
                      </ul>
                    </div>
                    <div className="product-price" id="price-preview">
                      <span className="pro-percen me-2">-50%</span>
                      <del>
                        <FormattedNumber
                          value={600000}
                          style="currency"
                          currency="VND"
                          minimumFractionDigits={0}
                        />
                      </del>
                      <span className="pro-price ms-2">
                        <FormattedNumber
                          value={product.price}
                          style="currency"
                          currency="VND"
                          minimumFractionDigits={0}
                        />
                      </span>
                    </div>
                    <div className="product-variants">
                      <form
                        action="/cart/add"
                        className="variants"
                        id="add-item-form"
                      >
                        <div className="select-swatch">
                          <div className="swatch">
                            <div className="title-swap">Màu sắc:</div>
                            <div className="select-swap">
                              {product.productImportResDTOS?.map(
                                (item, index) => (
                                  <input
                                    type="button"
                                    data-input="color-size"
                                    onClick={() => handleSetColor(index)}
                                    style={{
                                      backgroundColor: item.color,
                                      width: "30px",
                                      height: "30px",
                                      border: "0.5px solid gray",
                                      marginLeft: "5px",
                                      borderRadius: "90%",
                                    }}
                                  ></input>
                                )
                              )}
                            </div>
                          </div>
                          <div className="swatch">
                            <div className="title-swap">
                              Size: <strong></strong>
                            </div>
                            <div className="select-swap">
                              {product.productImportResDTOS?.map(
                                (item, index) => (
                                  <input
                                    type="button"
                                    data-input="color-size"
                                    onClick={() => handleSetSize(index)}
                                    style={{
                                      marginLeft: "5px",
                                      width: "30px",
                                      height: "30px",
                                      border: "0.1px solid gray",
                                    }}
                                    value={item.size}
                                  ></input>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                    <hr />

                    <div class="addcart-area">
                      <button
                        type="button"
                        id="add-to-cart"
                        onClick={() => handleAddToCart()}
                        class="add-to-cartProduct button dark btn-addtocart addtocart-modal"
                        name="add"
                      >
                        <span>Thêm vào giỏ</span>
                      </button>
                      <button
                        type="button"
                        id="buy-now"
                        class="btnred  
                                        add-to-cartProduct-buynow button dark btn-addtocart addtocart-modal"
                        name="add"
                        style={{ display: "inline-block" }}
                      >
                        <span>Mua ngay</span>
                      </button>
                    </div>
                    <hr />

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

          <hr />

          <section>
            <Container>
              <Row>
                <Col lg="12" md="12" className="d-flex justify-content-center">
                  <h1>Referenced Products</h1>
                </Col>
              </Row>
              <Row>
                <Col lg="12" md="12" className="related-product">
                  <Slider {...settingsRelatedProduct}>
                    {relatedProducts?.map((data) => (
                      <div className="related-product">
                        <Link to={`/productdetails/${data.id}`}>
                          <img
                            src={data.avatar.fileUrl}
                            style={{ width: "200px" }}
                          />
                        </Link>

                        <div className="d-flex justify-content-center">
                          <span>{data.title}</span>
                        </div>
                        <div className="d-flex justify-content-center">
                          <span style={{ color: "red", fontWeight: "600" }}>
                            <FormattedNumber
                              value={data.price}
                              style="currency"
                              currency="VND"
                              minimumFractionDigits={0}
                            />
                          </span>
                        </div>
                      </div>
                    ))}
                  </Slider>
                </Col>
              </Row>
            </Container>
          </section>
        </Container>
      </div>
    </>
  );
};

export default ProductDetails;
