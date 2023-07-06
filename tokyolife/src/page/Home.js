import React, { useEffect, useState } from "react";
import BannerList from "../component/Banner/BannerList.js";
import Helmet from "../component/Helmet/Helmet.js";
import { Container, Row } from "react-bootstrap";
import ProductList from "../component/UI/ProductList.js";
import Sales from "../component/Sale/Sales.js";
import CategoryService from '../assets/data/CategoryService.js';
import Products from "../assets/data/Products.js";




const Home = () => {

    const [state, setState] = useState({
        categories: [],
        products: [],
        listProductAllRender: [[], []],
    })

    useEffect(() => {

        let listProductAllRender = [];
        state.categories.filter(e => e.status === 'SUMMER').forEach(category => {
            listProductAllRender.push(products.filter(e => e.category.id === category.id))
        })


        setState({
            ...state,
            listProductAllRender,
        })
    }, [state.categories, state.products])

    useEffect(() => {
        try {
            async function getData() {
                let categoriesRes = await CategoryService.getCategory();
                let productsRes = await Products.getProductWithDiscount();
                let listProductAllRender = [];
                setState({
                    ...state,
                    categories: categoriesRes.data,
                    products: productsRes.data,
                    listProductAllRender,
                })
            }
            getData();
        } catch (error) {

        }
    }, [])


    const {
        products,
        listProductAllRender,
    } = state;




    return (
        <Helmet title={"Home"}>
            <section className="tokyo__banner">
                <Container>
                    <BannerList />
                </Container>
            </section>
            <section className="tokyo__sales">
                <Container>
                    <Sales />
                </Container>
            </section>
            <section className="product-list">
                <Container>
                    <Row>

                        <ProductList
                            listProductAllRender={listProductAllRender}
                        />
                    </Row>
                </Container>
            </section>
        </Helmet>
    )

}

export default Home