import React from "react";

import BannerList from "../component/Banner/bannerList.js";
import Helmet from "../component/Helmet/helmet";
import { Container, Row, Col } from "react-bootstrap";
import ProductList from "../component/UI/productList";


const Home = () => {


    return <Helmet title={"Home"}>
        <section className="tokyo__banner">
            <Container>
                <BannerList/>
            </Container>
        </section>
        <section className="discount_products">
            <Container>
                <Row>
                    <Col lg='12' md='12'>
                        <h2 className="section__title"> Discount Products</h2>
                    </Col>
                    <ProductList/>                   
                </Row>

            </Container>
        </section>
    </Helmet>

}

export default Home