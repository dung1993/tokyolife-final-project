import React, { useEffect, useState } from "react";
import BannerList from "../component/Banner/BannerList.js";
import Helmet from "../component/Helmet/Helmet";
import { Container, Row } from "react-bootstrap";
import ProductList from "../component/UI/ProductList.js";
import Sales from "../component/Sale/Sales.js";
import CategoryService from '../assets/data/CategoryService.js';
import Products from "../assets/data/Products";




const Home = () => {

    const [state, setState] = useState({
        categories: [],
        products: [],
        listProductAllRender: [[], []],
    })

    async function getData() {
        let categoriesRes = await CategoryService.getCategory();
        let productsRes = await Products.getProduct();
        // let categories = ;
        // let products = productsRes.data;
        let listProductAllRender = [];

        setState({
            ...state,
            categories: categoriesRes.data,
            products: productsRes.data,
            listProductAllRender,
        })
    }
    useEffect(() => {
        let listProductAllRender = [];
        state.categories.filter(e => e.status === 'SUMMER').forEach(category => {
            listProductAllRender.push(products.filter(e => e.category.id === category.id))
        })

        setState({
            ...state,
            listProductAllRender
        })
    }, [state.categories, state.products])

    // useEffect(() => {
    //     try {
    //         getData();
    //     } catch (error) {

    //     }
    // })
    useEffect(() => {
        try {
            getData().then(() => {
                //categories []
                // loop qua từng category call api get Product theo categoryId;
                // cầm Product + category in ra.
                // let listSpring = getListProductByStatus('SPRING', categories, products);
                console.log('done');
            })
                .finally(() => { })
        } catch (error) {

        }
    }, [])

    // const getListRenderByStatus = (status, categories, products) => {
    //     let list2 = getListProductByStatus(categories, products)
    //     let list3 = list2.filter((item) => item.category.status == status)
    //     return list3
    // }

    // const getListProductByStatus = (categories, products) => {
    //     let list2 = [];
    //     categories.forEach(category => {
    //         let list1 = getListByCategoryId(category, products)
    //         console.log('list1===', list1);
    //         let listTemp = list1.filter((item) => item.category.status === category.status)
    //         list2.push(listTemp)
    //     });
    //     console.log('list2===', list2);
    //     return list2;
    // }

    // const getListByCategoryId = (category, products) => {
    //     let list1 = products.filter((item) => item.category.id === category.id)
    //     return list1
    // }


    const {
        products,
        categories,
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
            <section className="discount_products">
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