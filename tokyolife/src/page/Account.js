import React from "react";
import { useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import CustomerService from "../assets/data/CustomerService";
import { useState } from "react";
import Cookies from "js-cookie";

const Account = () => {

    const [state, setState] = useState({
        fullName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        customerRes: {},
    })

    const params = useLocation().state;

    useEffect(() => {
        console.log(params);
    }, [params])

    const navigate = useNavigate();

    function handleClick() {
        Cookies.remove("user");

        // Chuyển hướng đến trang chủ
        navigate("/");
    }

    useEffect(() => {
        try {
            async function getData(username) {
                let customerRes = await CustomerService.getCustomerByUserName(username);
                setState({
                    ...state,
                    fullName: customerRes.data.fullName,
                    email: customerRes.data.email,
                    phone: customerRes.data.phone,
                    dateOfBirth: customerRes.data.dateOfBirth
                })
            }
            getData(params)
        } catch (error) {

        }
    }, [params])

    // useEffect(() => {
    //     console.log(params.data.username, "username");
    // }, [params.data.username])

    return (
        <>
            <Container>
                <h3>Tài Khoản Của Bạn</h3>
                <Row>
                    <Col lg="3" md="3">
                        <Link to={"/account"}><div className="account-folow">Thông tin tài khoản</div></Link>
                        <div className="exit-account" onClick={handleClick}>
                            Đăng xuất
                        </div>
                    </Col>
                    <Col lg="9" md="9">
                        <h5>Thông tin tài khoản</h5>
                        <div className="account-name">{state.fullName}</div>
                        <div className="account-email">{state.email}</div>
                        <div className="account-phone">{state.phone}</div>
                        <div className="account-dateOfBirth">{state.dateOfBirth}</div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Account