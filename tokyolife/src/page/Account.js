import React from "react";
import { useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import CustomerService from "../assets/data/CustomerService";
import { useState } from "react";

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
        // deleteJwtFromCookie();
        // Chuyển hướng đến trang chủ
        navigate("/");

    }

    // function deleteJwtFromCookie() {
    //     const name = 'JWT='
    //     const decodedCookie = decodeURIComponent(document.cookie)
    //     const cookieArray = decodedCookie.split(';')

    //     for (let i = 0; i < cookieArray.length; i++) {
    //         let cookie = cookieArray[i]
    //         while (cookie.charAt(0) === ' ') {
    //             cookie = cookie.substring(1)
    //         }
    //         if (cookie.indexOf(name) === 0) {
    //             document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/;'
    //         }
    //     }
    // }

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
                <h3 style={{ background: "#ffffff", padding: "30px 15px" }}>Tài Khoản Của Quý Khách</h3>
                <Row>
                    <Col lg="3" md="3">
                        <div className="left-bar" style={{ background: "#ffffff", padding: "15px" }}>
                            <Link to={"/account"}><div className="account-folow">Thông tin tài khoản</div></Link>
                            <div className="to-home-page" onClick={handleClick}>
                                Trở về trang Home
                            </div>
                        </div>

                    </Col>
                    <Col lg="9" md="9">
                        <div className="customer-information" style={{ background: "#ffffff", padding: "15px" }}>
                            <h5>Thông tin khách hàng</h5>
                            <div className="account-name">{state.fullName}</div>
                            <div className="account-email">{state.email}</div>
                            <div className="account-phone">{state.phone}</div>
                            <div className="account-dateOfBirth">{state.dateOfBirth}</div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Account