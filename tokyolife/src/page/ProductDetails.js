import React, { useState, useRef, useEffect, Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import Slider from "react-slick";
import "../component/Style/product-details.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FormattedNumber } from "react-intl";
import { Link, json, useLocation, useParams } from "react-router-dom";
import CustomerService from "../assets/data/CustomerService";
import { useSnackbar } from "notistack";

Fancybox.bind('[data-fancybox="gallery"]', {
  // Your custom options
});
const ProductDetails = ({ setCartDetail }) => {
  const { productId, categoryId } = useParams();
  const { username } = useParams();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [noAccountCart, setNoAccountCart] = useState();
  const [customerId, setCustomerId] = useState(1);

  document.title = "N2D shop - Product Detail";
  const [product, setProduct] = useState({});
  const [discountAmount, setDiscountAmount] = useState();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const [silder, setSlider] = useState({
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  });

  const sliderRef = useRef(null);
  //cung cấp thông tin cho order size, color
  const [color, setColor] = useState();
  const [size, setSize] = useState();
  const [colorArr, setColorArr] = useState([]);
  const [sizeArr, setSizeArr] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const [cart, setCart] = useState({});
  //khai bao phia ngoai route

  const [visitedproducts, setVisitedproducts] = useState([]);



  useEffect(() => {
    try {
      fetch(`http://localhost:8086/api/products/${productId}`).then(
        async (response) => {
          let product = await response.json();
          console.log(product);
          setProduct(product);
          const visitedProducts =
            JSON.parse(localStorage.getItem("visitedproduct")) || [];
          if (visitedProducts.length == 0) {
            const updateVisitedProducts = Array.from(
              new Set([...visitedProducts, productId])
            );
            localStorage.setItem(
              "visitedproduct",
              JSON.stringify(updateVisitedProducts)
            );
          } else {
            for (let i = 0; i < visitedProducts.length; i++) {
              if (productId != visitedProducts[i]) {
                const updateVisitedProducts = Array.from(
                  new Set([...visitedProducts, productId])
                );
                localStorage.setItem(
                  "visitedproduct",
                  JSON.stringify(updateVisitedProducts)
                );
              }
            }
          }

          if (product && product.productImportResDTOS) {
            const colorarr = product.productImportResDTOS.map(
              (item) => item.color
            );
            const uniqueColorArr = Array.from(new Set(colorarr));
            setColorArr(uniqueColorArr);
            const sizearr = product.productImportResDTOS.map(
              (item) => item.size
            );
            const uniqueSizeArr = Array.from(new Set(sizearr));
            setSizeArr(uniqueSizeArr);
          }
          setCheckQuantity(true);
          setQuantity(1);
          setDiscountAmount(
            product.price - (product.discount * product.price) / 100
          );
        }
      );
    } catch (error) {
      console.log("error product");
    }
  }, [productId]);

  useEffect(() => {
    const visitedProducts = JSON.parse(localStorage.getItem("visitedproduct"));
    const result = Array.from(new Set(visitedProducts));
    const array = result;
    for (let i = 0; i < array.length; i++) {
      if (productId == array[i]) {
        array.splice(i, 1);
        break;
      }
    }
    let temp1 = [];
    array.forEach((element) => {
      temp1.push(element);
    });

    const str = temp1.join("-");

    if (str) {
      try {
        fetch(
          `http://localhost:8086/api/products/visited?products=${str}`
        ).then(async (response) => {
          const products = await response.json();
          const temp = [...products];
          const uniqueProducts = Array.from(new Set(temp));
          setVisitedproducts(uniqueProducts);
          if (uniqueProducts.length >= 4) {
            setSlider({
              dots: false,
              infinite: true,
              speed: 500,
              slidesToShow: 4,
              slidesToScroll: 1,
            });
          } else {
            setSlider({
              dots: false,
              infinite: true,
              speed: 500,
              slidesToShow: uniqueProducts.length,
              slidesToScroll: 1,
            });
          }
        });
      } catch (error) {
        console.log("Đã xảy ra lỗi:", error);
      }
    }
  }, [productId]);

  const handleTab = (index) => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index);
    }
  };

  const handleSetSize = (size) => {
    setSize(size);
  };

  const handleSetColor = (color) => {
    const temp = [];
    if (product && product.productImportResDTOS) {
      for (let i = 0; i < product.productImportResDTOS.length; i++) {
        if (product.productImportResDTOS[i].color == color) {
          temp.push(product.productImportResDTOS[i].size);
        }
      }
      setSizeArr(temp);
    }
    setColor(color);
  };

  const handleIncreaseQuantity = () => {
    const quantityInput = document.getElementById("quantity");
    let quantity = parseInt(quantityInput.value);
    quantity += 1;
    quantityInput.value = quantity;
    setQuantity(quantity);
  };

  const handleDecreaseQuantity = () => {
    const quantityInput = document.getElementById("quantity");
    let quantity = parseInt(quantityInput.value);
    quantity -= 1;
    if (quantity > 0) {
      quantityInput.value = quantity;
      setQuantity(quantity);
    } else quantityInput.value = 1;
  };

  const handleQuantity = (e) => {
    setQuantity(e.target.value);
  };

  const [checkQuantity, setCheckQuantity] = useState(true);
  const [alertQuantity, setAlertQuantity] = useState();

  useEffect(() => {
    if (product && product.productImportResDTOS) {
      setCheckQuantity(true);
      for (let i = 0; i < product.productImportResDTOS.length; i++) {
        if (
          product.productImportResDTOS[i].size == size &&
          product.productImportResDTOS[i].color == color &&
          product.productImportResDTOS[i].quantity < quantity
        ) {
          setCheckQuantity(false);
          setAlertQuantity(product.productImportResDTOS[i].quantity);
        }
      }
    }
  }, [quantity]);

  const [checkCart, setCheckCart] = useState(false);

  const handleAddToCart = () => {
    if (color == null) {
      enqueueSnackbar("Hãy chọn màu", { variant: "error" });
      return;
    }
    if (size == null) {
      enqueueSnackbar("Hãy chọn kích thước", { variant: "error" });
      return;
    }

    if (document.cookie !== '') {
      setCart((prevCart) => ({
        ...prevCart,
        customerId: customerId,
        productId: product.id,
        status: "ISCART",
        price: product.price,
        title: product.title,
        size: size,
        quantity: quantity,
        color: color,
        username: localStorage.getItem('username')
      }));
    } else {
      let cartStore = JSON.parse(localStorage.getItem("cartStore"));

      if (!Array.isArray(cartStore)) {
        cartStore = [];
      }
      const newCartItem = {
        idCart: '',
        username: '',
        id: product.id,
        status: "ISCART",
        price: product.price,
        title: product.title,
        size: size,
        quantity: quantity,
        color: color,
        avt: product.images[0].fileUrl,
        discount: product.discount,
        totalAmountItemNoAccount: product.price - (product.discount * quantity * product.price / 100),
      };
      console.log(product.discountAmount, quantity)
      const isDuplicateItem = cartStore.find(
        (item) =>
          item.color === newCartItem.color &&
          item.size === newCartItem.size &&
          item.id === newCartItem.id
      );
      if (isDuplicateItem) {
        isDuplicateItem.quantity =
          isDuplicateItem.quantity + newCartItem.quantity;
        console.log("test" + JSON.stringify(isDuplicateItem));
      } else {
        cartStore.push(newCartItem)

      }
      setNoAccountCart(cartStore);
      localStorage.setItem("cartStore", JSON.stringify(cartStore));
      enqueueSnackbar("Thao tác thành công!", {
        variant: "success",
      });


      setCheckCart(true);
    };
  }

  useEffect(() => {
    console.log(document.cookie, cart.productId)
    if (document.cookie != '' && cart.productId) {

      fetch("http://localhost:8086/api/carts/add", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(cart),
      }).then(async (response) => {
        let result = await response.json();
        console.log(result);
        enqueueSnackbar("Thao tác thành công!", {
          variant: "success",
        });
      });

    }
  }, [cart]);



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
                      <Link to={`/`}>Trang chu</Link>

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
                      <a key={index}>
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
                      {product.images?.map((data, index) => (
                        <a
                          key={index}
                          data-fancybox="gallery"
                          href={data.fileUrl}
                        >
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
                    {product.discount != 0 ? (
                      <div className="product-price" id="price-preview">
                        <span className="pro-percen me-2">
                          -{product.discount}%
                        </span>
                        <del>
                          <FormattedNumber
                            value={product.price}
                            style="currency"
                            currency="VND"
                            minimumFractionDigits={0}
                          />
                        </del>
                        <span className="pro-price ms-2">
                          <FormattedNumber
                            value={discountAmount}
                            style="currency"
                            currency="VND"
                            minimumFractionDigits={0}
                          />
                        </span>
                      </div>
                    ) : (
                      <div className="product-price" id="price-preview">
                        <span className="pro-price ms-2">
                          <FormattedNumber
                            value={product.price}
                            style="currency"
                            currency="VND"
                            minimumFractionDigits={0}
                          />
                        </span>
                      </div>
                    )}

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
                              {colorArr?.map((item, index) => (
                                <input
                                  key={index}
                                  type="button"
                                  data-input="color-size"
                                  onClick={() => handleSetColor(item)}
                                  style={{
                                    backgroundColor: item,
                                    width: "30px",
                                    height: "30px",
                                    border: "0.5px solid gray",
                                    marginLeft: "5px",
                                    borderRadius: "90%",
                                  }}
                                ></input>
                              ))}
                            </div>
                          </div>
                          <div className="swatch">
                            <div className="title-swap">
                              Size: <strong></strong>
                            </div>
                            <div className="select-swap">
                              {sizeArr?.map((item, index) => (
                                <input
                                  type="button"
                                  data-input="color-size"
                                  onClick={() => handleSetSize(item)}
                                  style={{
                                    marginLeft: "5px",
                                    width: "30px",
                                    height: "30px",
                                    border: "0.1px solid gray",
                                  }}
                                  value={item}
                                ></input>
                              ))}
                            </div>
                          </div>

                          <div style={{ marginTop: "5px" }}>
                            {product && checkQuantity
                              ? null
                              : `Số lượng hàng trong kho: ${alertQuantity}`}
                          </div>
                        </div>
                      </form>
                    </div>
                    <hr />

                    <div class="quantity-area clearfix">
                      <input
                        type="button"
                        value="-"
                        onClick={() => handleDecreaseQuantity()}
                        class="qty-btn"
                        id="quantity-btn"
                      />
                      <input
                        type="text"
                        id="quantity"
                        name="quantity"
                        value={quantity}
                        min="1"
                        class="quantity-input"
                        onChange={(e) => handleQuantity(e)}
                      />
                      <input
                        type="button"
                        value="+"
                        onclick="HRT.All.plusQuantity()"
                        class="qty-btn"
                        onClick={() => handleIncreaseQuantity()}
                      />
                    </div>

                    <div>
                      <span style={{ color: "red" }}>
                        {product && checkQuantity
                          ? null
                          : `* Số lượng vượt quá hàng trong kho. Xin vui lòng nhập lại`}
                      </span>
                    </div>

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
                        class="btnred add-to-cartProduct-buynow button dark btn-addtocart addtocart-modal"
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

          {
            <section>
              <Container className="visitedProducts">
                <Row>
                  <Col
                    lg="12"
                    md="12"
                    className="d-flex justify-content-center"
                  >
                    <h1>visited Products</h1>
                  </Col>
                </Row>
                <Row>
                  <Col lg="12" md="12">
                    <Slider {...silder}>
                      {visitedproducts.length > 0
                        ? visitedproducts?.map((data, index) => {
                          return (
                            <div key={index} className="related-product">
                              <div className="related-product-slide">
                                <Link to={`/productdetails/${data?.id}`}>
                                  <img
                                    src={data?.urlImage}
                                    style={{ width: "200px" }}
                                  />
                                </Link>

                                <div className="d-flex justify-content-center">
                                  <span>{data?.title}</span>
                                </div>
                                <div className="d-flex justify-content-center">
                                  <span
                                    style={{
                                      color: "red",
                                      fontWeight: "600",
                                    }}
                                  >
                                    <FormattedNumber
                                      value={data?.price}
                                      style="currency"
                                      currency="VND"
                                      minimumFractionDigits={0}
                                    />
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })
                        : null}
                    </Slider>
                  </Col>
                </Row>
              </Container>
            </section>
          }
        </Container>
      </div>
    </>
  );
};

export default ProductDetails;
