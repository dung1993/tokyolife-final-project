import React from "react";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Container, Row } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./auth.css"
import AuthService from "../../assets/data/AuthService";
import Cookies from "js-cookie";


const Auth = ({ isOpen, toggle, onLoginSuccess }) => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        if (data.email
            && data.password) {
            AuthService.postLogin({
                username: data.email,
                password: data.password,
            }).then((dataUser) => {
                console.log(dataUser, "dataUser");
                Cookies.set('JWT', dataUser.data.token);
                onLoginSuccess();
            }).catch((error) => {
                console.error(error);
            })
        }
    };

    return (
        <div>
            <Modal className="modal__login modal-sm" isOpen={isOpen} toggle={toggle}>
                <ModalHeader toggle={toggle}>
                    <Container>
                        <Row className="modal__header">
                            <div className="nav_warpper w-auto">
                                <span>ĐĂNG NHẬP TÀI KHOẢN</span>
                                <p>Nhập email và mật khẩu của bạn:</p>
                            </div>
                        </Row>
                    </Container>
                </ModalHeader>
                <ModalBody>
                    <form id="customer-login" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form__input-wrapper">
                            <label htmlFor="">Email</label>
                            <input type="email" name="email" {...register("email", { required: true })} />
                            {errors.email && <span>This field is required</span>}
                        </div>
                        <div className="form__input-wrapper">
                            <label htmlFor="">Password</label>
                            <input type="password" name="password" {...register("password", { required: true })} />
                            {errors.password && <span>This field is required</span>}
                        </div>
                        <div class="sitebox-recaptcha">
                            This site is protected by reCAPTCHA and the Google

                            <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" style={{ color: "blue" }}> Privacy Policy </a>

                            and
                            <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer" style={{ color: "blue" }}> Terms of Service </a> apply.
                        </div>

                        <button type="submit" className="form-submit btn btn-dark">Đăng Nhập</button>
                    </form>

                    {/* <div className="wrap-social-login-plus">
                        <button className="btn-login-plus btn-google-login" id="btn-google-login-styled" >
                            <i className="fa-brands fa-google-plus-g me-1"></i>
                            <p>Đăng nhập Google</p>
                        </button>
                        <button className="btn-login-plus btn-facebook-login" id="btn-facebook-login-styled" >
                            <i class="fa-brands fa-facebook-f me-2"></i>
                            <p>Đăng nhập facebook</p>
                        </button>
                    </div> */}
                    <div className="additional-options">
                        <Link to={`/register`}><div className="d-flex">Khách hàng mới? Tạo tài khoản</div></Link>
                        <Link to={`/forgot-password`}><div>Quên mật khẩu? Khôi phục mật khẩu</div></Link>

                    </div>
                </ModalBody>
            </Modal>
        </div>
    );
}

export default Auth