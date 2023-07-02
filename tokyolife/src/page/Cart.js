import { React, useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import "../component/Style/cart.css";
import { FormattedNumber } from "react-intl";

const Cart = () => {
  const [products, setProducts] = useState();
  const [cartDetailLength, setCartDetailLength] = useState();
  useEffect(() => {
    fetch(`http://localhost:8086/api/carts/cart-details/1`).then(
      async (response) => {
        let products = await response.json();
        setProducts(products);
        console.log(products);
      }
    );
  }, []);
  useEffect(() => {
    if (products) {
      setCartDetailLength(products.length);
    }
  }, [products]);
  const handleRemoveItem = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    console.log(updatedProducts);
    setProducts(updatedProducts);
  };
  return (
    <>
      <div className="cartDetail">
        <Container>
          <Row>
            <div className="col-lg-12">
              <ul className="title-top">
                <li>
                  <a>Trang chu </a>
                  <span>&nbsp;&nbsp;</span>
                </li>
                <span>&#47;&nbsp;&nbsp;&nbsp;</span>
                <li>
                  <a href="#">Gio hang ({cartDetailLength})</a>
                  <span>&nbsp;&nbsp;</span>
                </li>
              </ul>
            </div>
          </Row>
          <Row>
            <div className="col-md-8 col-sm-12 col-xs-12 contentCart-detail">
              <div class="mainCart-detail">
                <div class="heading-cart">
                  <h1>Giỏ hàng của bạn</h1>
                </div>
                <div className="list-pageform-cart">
                  <form id="cartformpage">
                    <div className="cart-row">
                      <p class="title-number-cart">
                        Bạn đang có{" "}
                        <strong class="count-cart">
                          {cartDetailLength} sản phẩm
                        </strong>{" "}
                        trong giỏ hàng
                      </p>
                      <div className="table-cart">
                        {products?.map((data, index) => (
                          <div key={index}>
                            {index !== products.length - 1 ? (
                              <div className="media-line-item line-item">
                                <div className="media-left">
                                  <div class="item-img">
                                    <img src={data.avt} alt={data.title} />
                                  </div>
                                  <div class="item-remove">
                                    <a
                                      type="button"
                                      onClick={() => handleRemoveItem(index)}
                                    >
                                      Xóa
                                    </a>
                                  </div>
                                </div>
                                <div className="media-right">
                                  <div class="item-info">
                                    <h3 class="item--title">
                                      <a href="/products/quan-boi-nam-c7bkn007m">
                                        {data.title}
                                      </a>
                                    </h3>

                                    <div class="item--variant">
                                      <span>
                                        {data.color} / {data.size}
                                      </span>
                                    </div>
                                  </div>
                                  <div class="item-price">
                                    <p>
                                      <span>
                                        <FormattedNumber
                                          value={data.price}
                                          style="currency"
                                          currency="VND"
                                          minimumFractionDigits={0}
                                        />
                                      </span>
                                    </p>
                                  </div>
                                </div>
                                <div className="media-total">
                                  <div class="item-total-price">
                                    <span class="line-item-total">
                                      <FormattedNumber
                                        value={data.totalAmountItem}
                                        style="currency"
                                        currency="VND"
                                        minimumFractionDigits={0}
                                      />
                                    </span>
                                  </div>
                                  <div className="item-quantity">
                                    <div className="qty quantity-partent qty-click clearfix">
                                      <button
                                        type="button"
                                        class="qtyminus qty-btn"
                                      >
                                        -
                                      </button>
                                      <input
                                        type="text"
                                        size="4"
                                        name="updates[]"
                                        min="1"
                                        productid="1046555400"
                                        id="updates_1105003741"
                                        data-price="29000000"
                                        value={data.quantity}
                                        class="tc line-item-qty item-quantity"
                                      ></input>
                                      <button
                                        type="button"
                                        class="qtyplus qty-btn"
                                      >
                                        +
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div
                                className="media-line-item line-item"
                                style={{ borderBottom: "none" }}
                              >
                                <div className="media-left">
                                  <div class="item-img">
                                    <img src={data.avt} alt={data.title} />
                                  </div>
                                  <div class="item-remove">
                                    <a
                                      type="button"
                                      onClick={() => handleRemoveItem(index)}
                                    >
                                      Xóa
                                    </a>
                                  </div>
                                </div>
                                <div className="media-right">
                                  <div class="item-info">
                                    <h3 class="item--title">
                                      <a href="/products/quan-boi-nam-c7bkn007m">
                                        {data.title}
                                      </a>
                                    </h3>

                                    <div class="item--variant">
                                      <span>
                                        {data.color} / {data.size}
                                      </span>
                                    </div>
                                  </div>
                                  <div class="item-price">
                                    <p>
                                      <span>
                                        <FormattedNumber
                                          value={data.price}
                                          style="currency"
                                          currency="VND"
                                          minimumFractionDigits={0}
                                        />
                                      </span>
                                    </p>
                                  </div>
                                </div>
                                <div className="media-total">
                                  <div class="item-total-price">
                                    <span class="line-item-total">
                                      <FormattedNumber
                                        value={data.totalAmountItem}
                                        style="currency"
                                        currency="VND"
                                        minimumFractionDigits={0}
                                      />
                                    </span>
                                  </div>
                                  <div className="item-quantity">
                                    <div className="qty quantity-partent qty-click clearfix">
                                      <button
                                        type="button"
                                        class="qtyminus qty-btn"
                                      >
                                        -
                                      </button>
                                      <input
                                        type="text"
                                        size="4"
                                        name="updates[]"
                                        min="1"
                                        productid="1046555400"
                                        id="updates_1105003741"
                                        data-price="29000000"
                                        value={data.quantity}
                                        class="tc line-item-qty item-quantity"
                                      ></input>
                                      <button
                                        type="button"
                                        class="qtyplus qty-btn"
                                      >
                                        +
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-12 col-xs-12 sidebarCart-sticky">
              <div className="mainCart-sidebar wrap-order-summary">
                <div className="order-summary-block">
                  <h2 class="summary-title">Thông tin đơn hàng</h2>
                  <div class="summary-total">
                    <p
                      style={{
                        color: "#252a2b",
                        lineHeight: "1.45",
                        fontSize: "16px",
                      }}
                    >
                      Tổng giá trước KM:{" "}
                      <span
                        style={{
                          color: "#252a2b",
                          fontSize: "20px",
                          fontWeight: "normal",
                        }}
                      >
                        <del>2,090,000₫</del>
                      </span>
                    </p>
                    <p className="total-amount">
                      Tổng tiền:{" "}
                      <span class="total-final">
                        <FormattedNumber
                          value={products[0].totalAmountCart}
                          style="currency"
                          currency="VND"
                          minimumFractionDigits={0}
                        />
                      </span>
                    </p>
                  </div>

                  <div class="summary-action">
                    <p>
                      TokyoLife FreeShip toàn quốc với đơn hàng từ 500.000Đ!
                    </p>
                    <p>
                      <strong>LƯU Ý</strong>: Đơn hàng có thể được giao làm
                      nhiều lần do được vận chuyển từ nhiều kho
                    </p>{" "}
                    {/* <div class="summary-alert alert alert-danger ">
                      Giỏ hàng của bạn hiện chưa đạt mức tối thiểu để thanh
                      toán.
                    </div> */}
                    <div class="summary-button">
                      <a
                        id="btnCart-checkout"
                        class="checkout-btn btnred "
                        data-price-min="150000"
                        data-price-total="1754000"
                        href="#"
                      >
                        THANH TOÁN{" "}
                      </a>
                    </div>
                    <div id="script-cart-container"></div>
                  </div>
                </div>
                <div className="order-summary-block order-summary-notify "></div>
              </div>
            </div>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Cart;
