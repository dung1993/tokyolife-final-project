import { React, useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import "../component/Style/checkout.css";
import { useForm } from "react-hook-form";
import { FormattedNumber } from "react-intl";
import FormInput from "../component/Form/FormInput";
import CartService from "../assets/data/CartService";
import { toast } from "react-toastify";


const Checkout = () => {
  const [products, setProducts] = useState();
  const [provinces, setProvinces] = useState(null);
  const [provinceId, setProvinceId] = useState();
  const [provinceName, setProvinceName] = useState();
  const [districts, setDistricts] = useState(null);
  const [districtId, setDistrictId] = useState();
  const [districtName, setDistrictName] = useState();
  const [wards, setWards] = useState();
  const [wardId, setWardId] = useState()
  const [wardName, setWardName] = useState()
  const [customer, setCustomer] = useState();
  const [totalAmountCart, setTotalAmountCart] = useState();
  const [customerId, setCustomerId] = useState(0)
  const [cartId, setCartId] = useState();
  const [check, setCheck] = useState(1);
  const [values, setValues] = useState({
    name_receiver: "",
    phone_receiver: "",
    address: "",
  });

  const [state, setState] = useState({
    cartRes: {},

  })

  const inputs = [
    {
      id: 1,
      name: "name_receiver",
      type: "text",
      placeholder: "Fullname",
      errorsMessage: "Fullname is required",
      label: "Fullname",
      required: true,
    },
    {
      id: 2,
      name: "phone_receiver",
      type: "text",
      placeholder: "Phone Number",
      errorsMessage: "Phone number should be 10-12 characters",
      label: "Phone",
      required: true,
    },
    {
      id: 3,
      name: "address",
      type: "text",
      placeholder: "Address",
      errorsMessage: "Address is required",
      label: "Address",
      required: true,
    },
  ];

  const newObj = {
    cardId: cartId,
    cartDetailResDTOList: products,
    receiverName: values.name_receiver,
    phone: values.phone_receiver,
    totalAmount: totalAmountCart,
    customerId: customerId,
    locationRegion: {
      id: null,
      provinceId: provinceId,
      provinceName: provinceName,
      districtId: districtId,
      districtName: districtName,
      wardId: wardId,
      wardName: wardName,
      address: values.address,
    }
  }



  const handleOrderSuccess = (e) => {
    e.preventDefault();
  }


  const handleSubmit = (e) => {
    console.log('submit')
    e.preventDefault();
    newObj.username = localStorage.getItem('username');
    fetch('http://localhost:8086/api/carts/checkout', {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newObj)
    })
  };

  useEffect(() => {
    if (document.cookie) {
      fetch(`http://localhost:8086/api/carts/cart-details/${localStorage.getItem('username')}`).then(
        async (data) => {
          let products = await data.json();
          setProducts(products);
        }
      );
    }
    else {
      let products = JSON.parse(localStorage.getItem("cartStore"))
      setProducts(products)
      console.log(products);
      let totalAmountCart = 0
      products.map((item) => {
        totalAmountCart += item.quantity * item.price;
      })
      setTotalAmountCart(totalAmountCart)
    }

  }, [customerId]);

  useEffect(() => {
    if (document.cookie) {
      fetch(`http://localhost:8086/api/carts/amount/${localStorage.getItem('username')}`).then(async (data) => {
        let cart = await data.json();
        setTotalAmountCart(cart.totalAmountCart);
        setCartId(cart.id)
      });
    }

  }, customerId);

  useEffect(() => {
    if (document.cookie) {
      fetch(`http://localhost:8086/api/carts/customer/${localStorage.getItem('username')}`).then(
        async (response) => {
          let customer = await response.json();
          setCustomer(customer);
        }
      );
    }

  }, customerId);

  useEffect(() => {
    fetch("https://vapi.vnappmob.com/api/province/").then(async (response) => {
      let province = await response.json();
      setProvinces(province);
    });
  }, []);

  const handleProvince = (e) => {
    let provinceId = e.target.value;
    let provinceName = e.target.options[e.target.selectedIndex].getAttribute("name")
    setProvinceId(provinceId);
    setProvinceName(provinceName)
  };

  useEffect(() => {
    try {
      if (provinceId) {
        fetch(
          `https://vapi.vnappmob.com/api/province/district/${provinceId}`
        ).then(async (response) => {
          let districts = await response.json();
          setDistricts(districts.results);
          setWards();
        });
      }
    } catch (error) {
      console.log(error);
    }
  }, [provinceId]);

  const handleDistrict = (e) => {
    let districtId = e.target.value;
    let distrctName = e.target.options[e.target.selectedIndex].getAttribute("name")
    setDistrictName(distrctName)
    setDistrictId(districtId);
  };

  const handleWard = (e) => {
    let wardId = e.target.value
    let wardName = e.target.options[e.target.selectedIndex].getAttribute("name")
    setWardId(wardId)
    setWardName(wardName)
  }

  useEffect(() => {
    fetch(`https://vapi.vnappmob.com/api/province/ward/${districtId}`).then(
      async (response) => {
        let wards = await response.json();
        setWards(wards.results);
      }
    );
  }, [districtId]);

  const onChange = (e) => {
    console.log(e.target.name);
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  console.log(values.name_receiver);
  return (
    <>
      <div className="checkout-page">
        <Container>
          <Row>
            <div className="col-lg-7">
              <div className="main">
                <div className="main-header">
                  <a href="/" className="logo">
                    <h1 className="logo-text">TokyoLife</h1>
                  </a>

                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="/cart">Giỏ hàng</a>
                    </li>

                    <li className="breadcrumb-item breadcrumb-item-current">
                      Thông tin giao hàng
                    </li>
                  </ul>
                </div>
                <div className="main-content">
                  <div
                    id="checkout_order_information_changed_error_message"
                    className="hidden"
                    style={{ marginBottom: "15px" }}
                  >
                    <div className="step">
                      <div className="step-sections steps-onepage">
                        <div className="section">
                          <div className="section-header">
                            <h2 className="section-title">
                              Thông tin giao hàng
                            </h2>
                          </div>
                          <div className="section-content section-customer-information no-mb">
                            <input
                              type="hidden"
                              name="checkout_user[email]"
                              value={customer?.email}
                            />
                            <div className="logged-in-customer-information">
                              &nbsp;
                              <div className="logged-in-customer-information-avatar-wrapper">
                                <div
                                  className="logged-in-customer-information-avatar gravatar"
                                  style={{
                                    backgroundImage:
                                      "url(https://png.pngtree.com/png-clipart/20200224/original/pngtree-businessman-avatar-cartoon-style-png-image_5234654.jpg)",
                                  }}
                                ></div>
                              </div>
                              {

                                customerId ? (<p className="logged-in-customer-information-paragraph">
                                  {customer?.fullName} ({customer?.email})
                                  <br />
                                  <a href="/account/logout?return_url=%2Fcheckouts%2Fad9e7dfa23044ffeabbee02030f84bc2%3Fstep%3D1">
                                    Đăng xuất
                                  </a>
                                </p>) :
                                  <p className="logged-in-customer-information-paragraph">
                                    Bạn đã có tài khoản? Đăng nhập
                                    <br />

                                  </p>
                              }

                            </div>

                            <form onSubmit={handleSubmit}>
                              {/* <div class="mb-3">
                                <label
                                  for="exampleInputEmail1"
                                  class="form-label"
                                >
                                  Address
                                </label>
                                <select
                                  id="disabledSelect"
                                  class="form-select"
                                  {...register("address")}
                                >
                                  <option>Disabled select</option>
                                </select>
                              </div> */}
                              {inputs.map((input) => {
                                return (
                                  <FormInput
                                    key={input.id}
                                    {...input}
                                    value={values[input.name]}
                                    onChange={onChange}
                                  ></FormInput>
                                );
                              })}

                              <div class="mb-3 row">
                                <div class="col-md-4">
                                  <label for="inputCity" class="form-label">
                                    Tinh / Thanh
                                  </label>
                                  <select
                                    id="inputState"
                                    class="form-select"
                                    onChange={(e) => handleProvince(e)}
                                  >
                                    <option selected>Choose...</option>
                                    {provinces?.results?.map((data, index) => (
                                      <option
                                        key={index}
                                        value={data.province_id}
                                        name={data.province_name}
                                      >
                                        {data.province_name}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                                <div class="col-md-4">
                                  <label for="inputState" class="form-label">
                                    Quan / Huyen
                                  </label>

                                  <select
                                    id="inputState"
                                    class="form-select"
                                    onChange={(e) => handleDistrict(e)}
                                  >
                                    <option selected>Choose...</option>

                                    {districts &&
                                      districts?.map((data, index) => (
                                        <option
                                          key={index}
                                          value={data.district_id}
                                          name={data.district_name}
                                        >
                                          {data.district_name}
                                        </option>
                                      ))}
                                  </select>
                                </div>
                                <div class="col-md-4">
                                  <label for="inputZip" class="form-label">
                                    Phuong / Xa
                                  </label>
                                  <select id="inputState" class="form-select" onChange={(e) => handleWard(e)}>
                                    <option selected>Choose...</option>
                                    {wards?.map((data, index) => (
                                      <option key={index} value={data.ward_id} name={data.ward_name}>
                                        {data.ward_name}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>

                              <button type="submit" class="btn btn-primary">
                                Hoàn tất đơn hàng
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="sidebar-content">
                <table class="product-table">
                  <thead>
                    <tr>
                      <th scope="col">
                        <span class="visually-hidden">Hình ảnh</span>
                      </th>
                      <th scope="col">
                        <span class="visually-hidden">Mô tả</span>
                      </th>
                      <th scope="col">
                        <span class="visually-hidden">Giá</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody style={{ backgroundColor: "#f9f7f7" }}>
                    {products?.map((data, index) => (
                      <tr
                        class="product row mb-4"
                        scope="row"
                        data-product-id="1046555400"
                        data-variant-id="1105003741"
                      >
                        <td class="product-image col-lg-3 d-flex justify-content-center">
                          <div class="product-thumbnail">
                            <img
                              class="product-thumbnail-image"
                              alt={data.title}
                              src={data.avt}
                            />

                            <span
                              class="product-thumbnail-quantity"
                              aria-hidden="true"
                            >
                              {data.quantity}
                            </span>
                          </div>
                        </td>
                        <td class="product-description col-lg-6">
                          <span class="product-description-name order-summary-emphasis d-block">
                            {data.title}
                          </span>

                          <span class="product-description-variant order-summary-small-text">
                            {data.color} / {data.size}
                          </span>
                        </td>

                        <td class="product-price col-lg-3">
                          <span class="order-summary-emphasis">

                            {document.cookie != '' && (
                              <FormattedNumber
                                value={data.totalAmountItem || 0}
                                style="currency"
                                currency="VND"
                                minimumFractionDigits={0}
                              />
                            )}
                            {document.cookie == '' &&
                              <FormattedNumber
                                value={data.price * data.quantity}
                                style="currency"
                                currency="VND"
                                minimumFractionDigits={0}
                              />
                            }
                          </span>
                        </td>
                      </tr>
                    ))}
                    <hr />
                    <tr
                      class="product row mb-4"
                      scope="row"
                      data-product-id="1046555400"
                      data-variant-id="1105003741"
                    >
                      <td class="product-image col-lg-3 d-flex justify-content-center">
                        <div class="total-summary">Tổng tiền</div>
                      </td>
                      <td class="product-description col-lg-6"></td>

                      <td class="product-price col-lg-3">
                        <span class="order-summary">
                          <FormattedNumber
                            value={totalAmountCart}
                            style="currency"
                            currency="VND"
                            minimumFractionDigits={0}
                          />
                          {/* <div>test</div> */}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Row>
        </Container>
      </div>
    </>
  );
};
export default Checkout;
