import React from "react";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect, useState } from "react";
import Products from "../assets/data/Products";
import ProductsListFilter from "../component/UI/ProductListFilter";
import { useLocation } from "react-router-dom";
import Banner from "../component/Banner/Banner";
import CategoryService from './../assets/data/CategoryService';
import ProductImports from "../assets/data/ProductImports";
import Helmet from './../component/Helmet/Helmet';
import "../../node_modules/@fortawesome/fontawesome-free/css/all.min.css"
import "../component/Style/filter.css"


const ListProductWithCategory = () => {

    const [state, setState] = useState({
        products: [],
        productsRender: [[], []],
        category: [],
        colors: [],
        sizes: [],
        priceArr: [],
        colorArr: [],
        sizeArr: [],

    })

    const params = useLocation().state;

    const handleValue = (e) => {
        let id = e.target.id
        let price = e.target.value.split(" ")
        let checkbox = document.getElementById(id);
        console.log(price);
        // let priceArr = state.priceArr
        // let newPriceArr = []
        // let checkIfElse = false
        if (checkbox.checked) {
            let min = +price[0]
            let max = +price[1]

            console.log(max);
            console.log(min);

            //     if(priceArr.length === 0) {
            //         newPriceArr.push(price)
            //         setState({
            //             ...state,
            //             priceArr: newPriceArr
            //         })
            //     }
            //     else {
            //         priceArr.forEach(item => {
            //             if(item == price) {
            //                 checkIfElse = true
            //             }
            //         })
            //         if (checkIfElse == false){
            //             priceArr.push(price)
            //             newPriceArr = priceArr
            //             setState({
            //                 ...state,
            //                 priceArr: newPriceArr
            //             })
            //         }
            //     }

            // }
            // else {
            //     newPriceArr = priceArr.filter(item => item != price)
            //     setState({
            //         ...state,
            //         priceArr: newPriceArr
            //     })

        }
    }

    const handleColor = (e) => {
        let id = e.target.id
        let checkbox = document.getElementById(id);
        let color = e.target.value
        let colorArr = state.colorArr
        let newColorArr = []
        let checkIfElse = false

        if (checkbox.checked) {

            if (colorArr.length === 0) {
                newColorArr.push(color)
                setState({
                    ...state,
                    colorArr: newColorArr
                })
            }
            else {
                colorArr.forEach(item => {
                    if (item == color) {
                        checkIfElse = true
                    }
                });

                if (checkIfElse == false) {
                    colorArr.push(color)
                    newColorArr = colorArr
                    setState({
                        ...state,
                        colorArr: newColorArr
                    })
                }
            }

        }
        else {
            newColorArr = colorArr.filter(item => item != color)
            setState({
                ...state,
                colorArr: newColorArr
            })
        }

        let productsRender = []
        state.products.filter(item => (item.color == colorArr.forEach(color => {

        })))
        setState({
            ...state,
            productsRender: productsRender
        })
    }

    const handleSize = (e) => {
        let id = e.target.id
        let checkbox = document.getElementById(id)
        let size = e.target.value
        let sizeArr = state.sizeArr
        let newSizeArr = []
        let checkIfElse = false

        if (checkbox.checked) {
            if (sizeArr.length === 0) {
                newSizeArr.push(size)
                setState({
                    ...state,
                    sizeArr: newSizeArr
                })
            }
            else {
                sizeArr.forEach(item => {
                    if (item == size) {
                        checkIfElse = true
                    }
                });

                if (checkIfElse == false) {
                    sizeArr.push(size)
                    newSizeArr = sizeArr
                    setState({
                        ...state,
                        sizeArr: newSizeArr
                    })
                }
            }
        }
        else {
            newSizeArr = sizeArr.filter(item => item != size)
            setState({
                ...state,
                sizeArr: newSizeArr
            })
        }
    }

    useEffect(() => {
        try {
            async function getData(categoryId) {
                console.log(categoryId)
                let productsRes = await Products.postProductByCategoryId(categoryId);
                let categoryRes = await CategoryService.getCategoryById(categoryId);
                let colorsRes = await ProductImports.getAllColorByProductImportAndCategory(categoryId)
                let sizesRes = await ProductImports.getAllSizeByProductImportAndCategory(categoryId);
                setState({
                    ...state,
                    products: productsRes.data,
                    productsRender: productsRes.data,
                    category: categoryRes.data,
                    colors: colorsRes.data,
                    sizes: sizesRes.data,

                })
            }
            getData(params.id);
        } catch (error) {

        }
    }, [params.id])



    const { products, productsRes, category, colors, sizes } = state


    return <>

        <Helmet title={category?.name} />
        <section className="category__banner">
            <Container>
                <Banner />
            </Container>
        </section>
        <section className="category">
            <Container>
                <Row>
                    <Col><h2>{category?.name}</h2></Col>
                </Row>
            </Container>
        </section>
        <section className="filter-service">
            <Container className="d-flex">
                <Col lg="2" md="2" className="icon-filter d-flex align-items-center">
                    <i class="fa-solid fa-filter me-2"></i>
                    <p>Filter</p>
                </Col>
                <Col lg="10" md="10" className="fil-service d-flex justify-content-around align-items-center">
                    <div className="price-fil border-filter">
                        <div className="fil-title">
                            <span>Lọc Giá</span>
                            <span className="icon-control ms-2">
                                <i className="fa fa-chevron-down"></i>
                            </span>
                        </div>
                        <div className="filter-checkbox">
                            <ul className="checkbox d-none">
                                <li>
                                    <input className="me-2" type="checkbox" id="value_100000" value="0 100000" onChange={(e) => { handleValue(e) }} />
                                    <label htmlFor="">
                                        <span>Dưới</span> 100.000₫
                                    </label>
                                </li>
                                <li>
                                    <input className="me-2" type="checkbox" id="value-200000" value="100000 200000" onChange={(e) => { handleValue(e) }} />
                                    <label htmlFor="">
                                        100.000₫ - 200.000₫
                                    </label>
                                </li>
                                <li>
                                    <input className="me-2" type="checkbox" id="" value="200000 300000" onChange={(e) => { handleValue(e) }} />
                                    <label htmlFor="">
                                        200.000₫ - 300.000₫
                                    </label>
                                </li>
                                <li>

                                    <label htmlFor="">
                                        <input className="me-2" type="checkbox" id="" value="300000 400000" onChange={(e) => { handleValue(e) }} />
                                        300.000₫ - 400.000₫
                                    </label>
                                </li>
                                <li>
                                    <input className="me-2" type="checkbox" id="" value="400000 500000" onChange={(e) => { handleValue(e) }} />
                                    <label htmlFor="">
                                        400.000₫ - 500.000₫
                                    </label>
                                </li>
                                <li>
                                    <input className="me-2" type="checkbox" id="" value="500001" onChange={(e) => { handleValue(e) }} />
                                    <label htmlFor="">
                                        <span>Trên</span> 500.000₫
                                    </label>
                                </li>

                            </ul>
                        </div>

                    </div>
                    <div className="color-fil border-filter">
                        <div className="fil-title">
                            <span>Màu sắc</span>
                            <span className="icon-control ms-2">
                                <i className="fa fa-chevron-down"></i>

                            </span>
                        </div>
                        <div className="filter-checkbox">
                            <ul className="checkbox d-none">
                                {colors?.map(color => {
                                    return <>
                                        <li>
                                            <input className="me-2" type="checkbox" id={color} value={color} onChange={(e) => { handleColor(e) }} />
                                            <label htmlFor={color}>
                                                <span>{color}</span>
                                            </label>
                                        </li>
                                    </>

                                })}
                            </ul>
                        </div>
                    </div>
                    <div className="size-fil border-filter">
                        <div className="fil-title">
                            <span>Kích thước</span>
                            <span className="icon-control ms-2">
                                <i className="fa fa-chevron-down"></i>
                            </span>
                        </div>
                        <div className="filter-checkbox">
                            <ul className="checkbox d-none">
                                {sizes?.map(size => {
                                    return <>
                                        <li>
                                            <input className="me-2" type="checkbox" id={size} value={size} onChange={(e) => { handleSize(e) }} />
                                            <label htmlFor={size}>
                                                <span>{size}</span>
                                            </label>
                                        </li>
                                    </>

                                })}

                            </ul>
                        </div>

                    </div>
                </Col>
            </Container>
        </section>
        <section className="product-list">
            <Container>
                <Row>
                    <ProductsListFilter
                        products={products}
                    />
                </Row>
            </Container>
        </section>

    </>
}

export default ListProductWithCategory