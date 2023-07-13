import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import './footer.css';

const Footer = () => {
    return <>
        <footer className="bg-color text-center text-white">
            <Container className="content-footer">
                <Row className="mt-4">
                    <Col lg="3" md="3" xs="12" sm="12">
                        <div>
                            <div className="text-start">
                                <h4 className="cl-white text-start">Về TOKYOLIFE</h4>
                                <p className="cl-white mt-3">
                                    TokyoLife là cửa hàng bán lẻ đồ gia dụng, hóa mỹ phẩm, phụ kiện chính hãng các thương hiệu Nhật Bản: KAI, Inomata, Ebisu, Lec, ORP Tokyo, Kose , Momotani ,Naturie, Rohto , DHC , Orihiro , Naive, Aprica, Kose (Dòng Softymo), Shiseido (Dòng Senka, Anessa), KAO, Rosette, Naive, Ebisu, Unicharm, Tsubaki , Himawari, Rocket, Gunze-Sabrina, Regart… Nước hoa TokyoLife sản xuất tại Pháp. Hóa phẩm lành tính TokyoLife sản xuất tại Nhật Bản. Phụ kiện giày, túi, ví, balo và thời trang hiệu TokyoNow, TokyoBasic, TokyoSmart, TokyoSecret,  In The Now và nhiều thương hiệu thời trang, phụ kiện khác sản xuất tại Việt Nam, Trung Quốc, Thái Lan…
                                </p>
                            </div>
                        </div>
                    </Col>

                    <Col lg="3" md="3" xs="12" sm="12">
                        <div className="cl-white text-start">
                            <div className="address-footer text-start ms-4 mt-3">
                                <ul className="contact">
                                    <li className="contact-1">
                                        <b>Hotline CSKH:</b>
                                        <a className="cl-white">024.7300.6999</a>
                                    </li>
                                    <li className="contact-2">
                                        <b>Email CSKH:</b>
                                        <a className="cl-white">cskh@tokyolife.vn</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </Col>
                    <Col lg="3" md="3" xs="12" sm="12">
                        <div className="text-start">
                            <h4 className="cl-white text-start">Hỗ trợ khách hàng</h4>
                            <ul>
                                <li className="item">
                                    <a href="#">Giới thiệu và liên hệ</a>
                                </li>
                            </ul>
                        </div>
                    </Col>
                    <Col lg="3" md="3" xs="12" sm="12">
                        <h3 className="cl-white text-start">Hỗ trợ/Tư vấn mua online</h3>
                        <div className="footerInfo-hline">
                            <div className="icon-hl text-start">
                                <i className="fa fa-phone"></i>
                            </div>
                            <div className="content-hl text-start ">
                                <p className="cl-white m-0">0247 308 2882</p>
                                <p className="cl-white m-0">contact@tokyolife.vn</p>
                            </div>
                        </div>
                    </Col>
                </Row>

            </Container>
        </footer>
    </>
}

export default Footer;
