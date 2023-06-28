import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Container, Row } from 'react-bootstrap';
import "./auth.css"

const Auth = ({ isOpen, toggle }) => {

    const [state, setState] = useState({
        email: "",
        password: ""
    });

    const handleInputValue = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const handleLoginJWT = () => {

    }

    const { email, password } = state;
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
                    <form action="#" id="customer-login">
                        <div className="form__input-wrapper">
                            <label htmlFor="">Email</label>
                            <input type="email" name="email" onInput={handleInputValue} value={email} />
                        </div>
                        <div className="form__input-wrapper">
                            <label htmlFor="">Password</label>
                            <input type="password" name="password" onInput={handleInputValue} value={password} />
                        </div>
                    </form>
                    <div class="sitebox-recaptcha">
                        This site is protected by reCAPTCHA and the Google

                        <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" style={{ color: "blue" }}> Privacy Policy </a>

                        and
                        <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer" style={{ color: "blue" }}> Terms of Service </a> apply.
                    </div>

                    <button type="submit" className="form-submit btn btn-dark" onClick={handleLoginJWT}>Đăng Nhập</button>
                    <div className="wrap-social-login-plus">
                        <button className="btn-login-plus btn-google-login" id="btn-google-login-styled" >
                            <i className="fa-brands fa-google-plus-g me-1"></i>
                            <p>Đăng nhập Google</p>
                        </button>
                        <button className="btn-login-plus btn-facebook-login" id="btn-facebook-login-styled" >
                            <i class="fa-brands fa-facebook-f me-2"></i>
                            <p>Đăng nhập facebook</p>
                        </button>
                    </div>

                </ModalBody>
            </Modal>
        </div>
    );
}

export default Auth