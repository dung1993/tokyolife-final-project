import { React, useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import "../component/Style/cart.css";
import { FormattedNumber } from "react-intl";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
const Cart = ({ totalAmountCart, setTotalAmountCart }) => {
  const [products, setProducts] = useState();
  const [cartDetailLength, setCartDetailLength] = useState();
  const [totalAmountCartNoDiscount, setTotalAmountCartNoDiscount] = useState();
  const [customerId, setCustomerId] = useState();
  const [check, setCheck] = useState(0);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [totalAmountItem,setTotalAmountItem] = useState();
  useEffect(() => {
    if (customerId != null) {
      fetch(`http://localhost:8086/api/carts/cart-details/${customerId}`).then(
        async (response) => {
          let products = await response.json();
          setProducts(products);
          let totalCart = 0;
          let totalCarNoDiscount = 0;
          products.map((item) => {
            totalCarNoDiscount += item.price * item.quantity;
            totalCart += item.totalAmountItem;
          });
          setTotalAmountCart(totalCart);
          setTotalAmountCartNoDiscount(totalCarNoDiscount);
        }
      );
    } else {
      let products = JSON.parse(localStorage.getItem("cartStore"));
      setProducts(products);
      let totalCarNoDiscount = 0;

      products?.map((item) => {
        totalCarNoDiscount += item.price * item.quantity;
      });
      setTotalAmountCartNoDiscount(totalAmountCartNoDiscount);
    }
  }, [customerId, check]);

  useEffect(() => {
    if (products) {
      setCartDetailLength(products.length);
    }
  }, [products]);

  const handleRemoveItem = (id, index) => {
    if (id && customerId) {
      fetch(`http://localhost:8086/api/carts/cart-details/1/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(async (response) => {
        let result = await response.json();
        setTotalAmountCart(result.totalAmountCart);
        enqueueSnackbar("Remove item successfully.", {
          variant: "success",
        });
      });
    } else {
      //remove from local
      let cartStore = JSON.parse(localStorage.getItem("cartStore"));
      const updateCartStore = [...cartStore];
      updateCartStore.splice(index, 1);
      localStorage.setItem("cartStore", JSON.stringify(updateCartStore));
      setProducts(updateCartStore);
    }
  };

  useEffect(() => {
    if (products) {
      let totalCarNoDiscount = 0;
      let totalCartDiscount = 0;
      products.map((item) => {
        totalCartDiscount +=
          item.price * item.quantity -
          (item.price * item.quantity * item.discount) / 100;
        totalCarNoDiscount += item.price * item.quantity;
      });
      setTotalAmountCartNoDiscount(totalCarNoDiscount);
      setTotalAmountCart(totalCartDiscount);
    }
  }, [products]);

  const handleIncreaseQuantity = (id, index, price) => {
    let inputQuantity = document.getElementById(`${id}`);
    let increaseQuantity = parseInt(inputQuantity.value);
    increaseQuantity += 1;
    inputQuantity.value = increaseQuantity;

    if (customerId) {
      fetch(
        `http://localhost:8086/api/carts/cart-details/${customerId}/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(increaseQuantity),
        }
      ).then((e) => setCheck(check + 1));
    } else {
      
      let totalAmountItem = increaseQuantity*price;
      let cartStore = JSON.parse(localStorage.getItem("cartStore"));
      const updateCartStore = cartStore.map((item) =>
        item.id == id ? { ...item, quantity: increaseQuantity, totalAmountItemNoAccount:totalAmountItem } : item
      );
      localStorage.setItem("cartStore", JSON.stringify(updateCartStore));
      setCheck(check + 1);
    }
  };

  const handleDecreaseQuantity = (id, index, price) => {
    let inputQuantity = document.getElementById(`${id}`);
    let decreaseQuantity = parseInt(inputQuantity.value);
    decreaseQuantity -= 1;
    inputQuantity.value = decreaseQuantity;
    if (decreaseQuantity > 0) {
      if (customerId) {
        fetch(
          `http://localhost:8086/api/carts/cart-details/${customerId}/${id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(decreaseQuantity),
          }
        ).then((e) => setCheck(check + 1));
      } else {
      

        let totalAmountItem = decreaseQuantity * price
        let cartStore = JSON.parse(localStorage.getItem("cartStore"));
        const updateCartStore = cartStore.map((item) =>
          item.id == id ? { ...item, quantity: decreaseQuantity, totalAmountItemNoAccount:totalAmountItem } : item
        );
        localStorage.setItem("cartStore", JSON.stringify(updateCartStore));
        setCheck(check + 1);
      }
    } else inputQuantity.value = 1;
  };

  const handleInputQuantity = (e, id, index, price) => {
    let quantity = e.target.value;
    if (customerId) {
      fetch(
        `http://localhost:8086/api/carts/cart-details/${customerId}/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(quantity),
        }
      ).then((e) => setCheck(check + 1));
    } else {
      
      let totalAmount = quantity * price;
      let cartStore = JSON.parse(localStorage.getItem("cartStore"));
        const updateCartStore = cartStore.map((item) =>
          item.id == id ? { ...item, quantity: quantity, totalAmountItemNoAccount: totalAmount } : item
        );
        localStorage.setItem("cartStore", JSON.stringify(updateCartStore));
        setCheck(check + 1);
    }
  };

  return (
    <>
      <div className="cartDetail">
        <Container>
          <Row>
            <div className="col-lg-12">
              <ul className="title-top">
                <li>
                  <Link to={`/`}>Trang chu</Link>
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
                            {products && index !== products.length - 1 ? (
                              <div className="media-line-item line-item">
                                <div className="media-left">
                                  <div class="item-img">
                                    <img src={data.avt} alt={data.title} />
                                  </div>
                                  <div class="item-remove">
                                    <a
                                      type="button"
                                      onClick={() =>
                                        handleRemoveItem(data.id, index)
                                      }
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
                                    <span
                                      class="line-item-total"
                                      id={"totalAmount" + data.id}
                                    >
                                      {data.totalAmountItem && (
                                        <FormattedNumber
                                          value={data.totalAmountItem}
                                          style="currency"
                                          currency="VND"
                                          minimumFractionDigits={0}
                                        />
                                      )}
                                      <FormattedNumber
                                        value={data.totalAmountItemNoAccount}
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
                                        onClick={() =>
                                          handleDecreaseQuantity(
                                            data.id,
                                            index,
                                            data.price
                                          )
                                        }
                                      >
                                        -
                                      </button>
                                      <input
                                        type="text"
                                        size="4"
                                        name="updates[]"
                                        min="1"
                                        id={data.id}
                                        data-price="29000000"
                                        value={data.quantity}
                                        class="tc line-item-qty item-quantity"
                                        onChange={(e) =>
                                          handleInputQuantity(
                                            e,
                                            data.id,
                                            index,
                                            data.price
                                          )
                                        }
                                      ></input>
                                      <button
                                        type="button"
                                        class="qtyplus qty-btn"
                                        onClick={() =>
                                          handleIncreaseQuantity(
                                            data.id,
                                            index,
                                            data.price
                                          )
                                        }
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
                                      onClick={() =>
                                        handleRemoveItem(data.id, index)
                                      }
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
                                    <span
                                      class="line-item-total"
                                      id={"totalAmount" + data.id}
                                    >
                                      {data.totalAmountItem && (
                                        <FormattedNumber
                                          value={data.totalAmountItem}
                                          style="currency"
                                          currency="VND"
                                          minimumFractionDigits={0}
                                        />
                                      )}
                                      <FormattedNumber
                                        value={data.totalAmountItemNoAccount}
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
                                        onClick={() =>
                                          handleDecreaseQuantity(
                                            data.id,
                                            index,
                                            data.price
                                          )
                                        }
                                      >
                                        -
                                      </button>
                                      <input
                                        type="text"
                                        size="4"
                                        name="updates[]"
                                        min="1"
                                        id={data.id}
                                        data-price="29000000"
                                        value={data.quantity}
                                        class="tc line-item-qty item-quantity"
                                        onChange={(e) =>
                                          handleInputQuantity(
                                            e,
                                            data.id,
                                            index,
                                            data.price
                                          )
                                        }
                                      ></input>
                                      <button
                                        type="button"
                                        class="qtyplus qty-btn"
                                        onClick={() =>
                                          handleIncreaseQuantity(
                                            data.id,
                                            index,
                                            data.price
                                          )
                                        }
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
                        <del>
                          {products && (
                            <FormattedNumber
                              value={totalAmountCartNoDiscount}
                              style="currency"
                              currency="VND"
                              minimumFractionDigits={0}
                            />
                          )}
                        </del>
                      </span>
                    </p>
                    <p className="total-amount">
                      Tổng tiền:{" "}
                      <span class="total-final">
                        {products && customerId && (
                          <FormattedNumber
                            value={totalAmountCart}
                            style="currency"
                            currency="VND"
                            minimumFractionDigits={0}
                          />
                        )}
                        {products && (
                          <FormattedNumber
                            value={totalAmountCart}
                            style="currency"
                            currency="VND"
                            minimumFractionDigits={0}
                          />
                        )}
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
                      <Link
                        to={`/checkout`}
                        id="btnCart-checkout"
                        class="checkout-btn btnred "
                        data-price-min="150000"
                        data-price-total="1754000"
                        href=""
                      >
                        THANH TOÁN{" "}
                      </Link>
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
