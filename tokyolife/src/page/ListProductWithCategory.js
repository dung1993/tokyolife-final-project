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
import ListBestSeller from "../component/UI/ListBestSeller";
import "../../node_modules/@fortawesome/fontawesome-free/css/all.min.css"
import "../component/Style/filter.css"
import FiltersTag from './../component/UI/FiltersTag';



const ListProductWithCategory = () => {

    const [state, setState] = useState({
        categoriesRes: [],
        products: [],
        productsRes: [],
        category: [],
        colors: [],
        sizes: [],
        priceArr: [],
        colorArr: [],
        sizeArr: [],
        sort: "",
    })

    const params = useLocation().state;

    const handleChange = (e) => {
        const sort = e.target.value;

        console.log(e.target.value)

        if (sort !== state.sort) {
            setState({
                ...state,
                sort: sort,
            })
        }
    }

    const handleValue = (e) => {
        let tempArr = [];
        let arrSplit = e.target.value.split(' ').map(num => tempArr.push(Number(num)));

        const findPrice = state.priceArr.find(item => item[0] === tempArr[0] && item[1] === tempArr[1]);

        let arr = state.priceArr;
        if (findPrice) {
            arr = state.priceArr.filter(item => item[0] !== tempArr[0] && item[1] !== tempArr[1]);
        } else {
            arr.push(tempArr)
        }
        setState({
            ...state,
            priceArr: arr
        })
    }

    const handleColor = (e) => {
        const findColor = state.colorArr.find(color => color === e.target.value);
        let arr = state.colorArr;
        if (findColor) {
            arr = state.colorArr.filter(color => color !== e.target.value);
        } else {
            arr.push(e.target.value)
        }
        console.log(arr)
        setState({
            ...state,
            colorArr: [...arr]
        })
    }

    const handleSize = (e) => {
        console.log(e);

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
                let categoriesRes = await CategoryService.getAllCategory();
                let productsRes = await Products.postProductByCategoryId(categoryId);
                let categoryRes = await CategoryService.getCategoryById(categoryId);
                let colorsRes = await ProductImports.getAllColorByProductImportAndCategory(categoryId)
                let sizesRes = await ProductImports.getAllSizeByProductImportAndCategory(categoryId);
                setState({
                    ...state,
                    categoriesRes: categoriesRes.data,
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


    useEffect(() => {
        if (state.colorArr.length === 0 && state.sizeArr.length === 0 && state.priceArr.length === 0 && state.sort.value === "") {
            Products.getAllProductFilter({
                id: params.id,
                minMax: [],
                colors: [],
                sizes: [],
                sort: 'id,desc'
            }).then(e => {
                setState({
                    ...state,
                    products: e.data
                })
            })
        }
        Products.getAllProductFilter({
            id: params.id,
            minMax: state.priceArr,
            colors: state.colorArr,
            sizes: state.sizeArr,
            sort: state.sort
        }).then(e => {
            setState({
                ...state,
                products: e.data
            })
        })
    }, [state.colorArr, state.sizeArr, JSON.stringify(state.priceArr), state.sort])

    useEffect(() => {
        Products.getAllProductFilter({
            id: params.id,
            minMax: state.priceArr,
            colors: state.colorArr,
            sizes: state.sizeArr,
            sort: "bestseller"
        }).then(e => {
            setState({
                ...state,
                productsRes: e.data

            })
        })
    }, [])

    const { products, productsRes, category, priceArr, colorArr, sizeArr, colors, sizes } = state


    return <>
        <Container>
            <Helmet title={category?.name} />
            <section className="category__banner">
                <Container>
                    <Banner />
                </Container>
            </section>
            <section className="category">
                <Container>
                    <Row className="top-category" style={{ margin: 0, padding: '10px', alignItems: 'center', display: 'flex', background: '#ffffff', borderRadius: '5px' }}>
                        <Col><h2 style={{ margin: 0 }}>{category?.name}</h2></Col>
                        <Col style={{ display: "contents" }}>
                            <select className="form-select" id="sort" onChange={(e) => { handleChange(e) }}>
                                <option defaultChecked>
                                    <span>Sắp xếp</span>
                                    <i className="fa fa-chevron-down"></i>
                                </option>
                                <option value="prices,asc">Giá: Tăng dần</option>
                                <option value="prices,desc">Giá: Giảm dần</option>
                                <option value="title,asc">Tên: A-Z</option>
                                <option value="title,desc">Tên: Z-A</option>
                                <option value="inventory">Cũ nhất</option>
                                <option value="bestseller">Bán Chạy</option>

                            </select>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className="filter-service">
                <Container className="d-flex">
                    <Row className="nav-filter" style={{ width: "1320px" }}>
                        <Col lg="2" md="2" className="icon-filter d-flex align-items-center">
                            <i class="fa-solid fa-filter me-2"></i>
                            <p>Filter</p>
                        </Col>
                        <Col lg="10" md="10" className="fil-service d-flex justify-content-between align-items-center">
                            <div className="category-fil border-filter">
                                <div className="fil-title">
                                    <span>Loại</span>
                                    <span className="icon-control ms-2">
                                        <i className="fa fa-chevron-down"></i>
                                    </span>
                                </div>
                                <div className="filter-checkbox">
                                    <ul className="checkbox d-none">
                                        {/* {categories?.map(category => {
                                        return <>
                                            <li>
                                                <input className="me-2" type="checkbox" id={category} value={category} onChange={(e) => { handleSize(e) }} />
                                                <label htmlFor={category}>
                                                    <span>{category}</span>
                                                </label>
                                            </li>
                                        </>

                                    })} */}
                                    </ul>
                                </div>

                            </div>
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
                                            <label htmlFor="value_100000">
                                                <span>Dưới</span> 100.000₫
                                            </label>
                                        </li>
                                        <li>
                                            <input className="me-2" type="checkbox" id="value_200000" value="100000 200000" onChange={(e) => { handleValue(e) }} />
                                            <label htmlFor="value_200000">
                                                100.000₫ - 200.000₫
                                            </label>
                                        </li>
                                        <li>
                                            <input className="me-2" type="checkbox" id="value_300000" value="200000 300000" onChange={(e) => { handleValue(e) }} />
                                            <label htmlFor="value_300000">
                                                200.000₫ - 300.000₫
                                            </label>
                                        </li>
                                        <li>

                                            <label htmlFor="value_400000">
                                                <input className="me-2" type="checkbox" id="value_400000" value="300000 400000" onChange={(e) => { handleValue(e) }} />
                                                300.000₫ - 400.000₫
                                            </label>
                                        </li>
                                        <li>
                                            <input className="me-2" type="checkbox" id="value_500000" value="400000 500000" onChange={(e) => { handleValue(e) }} />
                                            <label htmlFor="value_500000">
                                                400.000₫ - 500.000₫
                                            </label>
                                        </li>
                                        <li>
                                            <input className="me-2" type="checkbox" id="value_600000" value="500001" onChange={(e) => { handleValue(e) }} />
                                            <label htmlFor="value_600000">
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
                                    <ul className="checkbox d-none ">
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
                    </Row>

                </Container>
            </section>
            <section>
                <Container>
                    <Row className="list-tags d-block">
                        {priceArr.length > 0 && <FiltersTag filtersTag={priceArr} title={'Lọc giá'} />}
                        {colorArr.length > 0 && <FiltersTag filtersTag={colorArr} title={'Màu sắc'} />}
                        {sizeArr.length > 0 && <FiltersTag filtersTag={sizeArr} title={'Kích thước'} />}
                        <FiltersTag />
                    </Row>
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
            <section className="bestseller-list" style={{ paddingBottom: "20px" }}>
                <Container>
                    <h5 style={{ margin: 0, padding: '10px', alignItems: 'center', display: 'flex', background: '#ffffff', borderRadius: '5px' }}>SẢN PHẨM BÁN CHẠY NHẤT</h5>
                    <Row>
                        <ListBestSeller
                            productsRes={productsRes}
                        />
                    </Row>
                </Container>
            </section>
        </Container>


    </>
}

export default ListProductWithCategory