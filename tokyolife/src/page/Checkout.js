import { React, useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import "../component/Style/checkout.css";
import { useForm } from "react-hook-form";
import { FormattedNumber } from "react-intl";
const Checkout = ({ products,totalAmountCart }) => {
  const [provinces, setProvinces] = useState(null);
  const [provinceId, setProvinceId] = useState();
  const [districts, setDistricts] = useState(null);
  const [districtId, setDistrictId] = useState();
  const [wards, setWards] = useState();
  const [customer, setCustomer] = useState();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  useEffect(() => {
    fetch("http://localhost:8086/api/carts/customer/1").then(
      async (response) => {
        let customer = await response.json();
        setCustomer(customer);
        console.log("customer" + customer);
      }
    );
  }, []);

  useEffect(() => {
    fetch("https://vapi.vnappmob.com/api/province/").then(async (response) => {
      let province = await response.json();
      setProvinces(province);
    });
  }, []);

  const handleProvince = (e) => {
    let provinceId = e.target.value;
    setProvinceId(provinceId);
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
    setDistrictId(districtId);
  };

  useEffect(() => {
    fetch(`https://vapi.vnappmob.com/api/province/ward/${districtId}`).then(
      async (response) => {
        let wards = await response.json();
        setWards(wards.results);
      }
    );
  }, [districtId]);

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
                              <p className="logged-in-customer-information-paragraph">
                                {customer?.fullName} ({customer?.email})
                                <br />
                                <a href="/account/logout?return_url=%2Fcheckouts%2Fad9e7dfa23044ffeabbee02030f84bc2%3Fstep%3D1">
                                  Đăng xuất
                                </a>
                              </p>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)}>
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
                              <div class="mb-3">
                                <label
                                  for="exampleInputPassword1"
                                  class="form-label"
                                >
                                  FullName
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="exampleInputPassword1"
                                  {...register("fullname")}
                                  placeholder={customer?.fullName}
                                />
                              </div>

                              <div class="mb-3">
                                <label
                                  for="exampleInputPassword1"
                                  class="form-label"
                                >
                                  Phone
                                </label>
                                <input
                                  type="number"
                                  class="form-control"
                                  id="exampleInputPassword1"
                                  {...register("phoneNumber")}
                                  placeholder={customer?.phone}
                                />
                              </div>
                              <div class="mb-3">
                                <label
                                  for="exampleInputPassword1"
                                  class="form-label"
                                >
                                  Address
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="exampleInputPassword1"
                                  {...register("address")}
                                />
                              </div>
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
                                  <select id="inputState" class="form-select">
                                    <option selected>Choose...</option>
                                    {wards?.map((data, index) => (
                                      <option key={index}>
                                        {data.ward_name}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>

                              <div class="mb-3 form-check">
                                <input
                                  type="checkbox"
                                  class="form-check-input"
                                  id="exampleCheck1"
                                />
                                <label
                                  class="form-check-label"
                                  for="exampleCheck1"
                                >
                                  Check me out
                                </label>
                              </div>
                              <button type="submit" class="btn btn-primary">
                                Submit
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
                              alt="Quần bơi nam C7BKN007M"
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
                            Quần bơi nam C7BKN007M
                          </span>

                          <span class="product-description-variant order-summary-small-text">
                            {data.color} / {data.size}
                          </span>
                        </td>

                        <td class="product-price col-lg-3">
                          <span class="order-summary-emphasis">
                            <FormattedNumber
                              value={data.totalAmountItem}
                              style="currency"
                              currency="VND"
                              minimumFractionDigits={0}
                            />
                          </span>
                        </td>
                      </tr>
                    ))}
                    <hr/>
                    <tr
                        class="product row mb-4"
                        scope="row"
                        data-product-id="1046555400"
                        data-variant-id="1105003741"
                      >
                        <td class="product-image col-lg-3 d-flex justify-content-center">
                          <div class="total-summary">
                            Tong tien
                          </div>
                        </td>
                        <td class="product-description col-lg-6">
                         
                        </td>

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
