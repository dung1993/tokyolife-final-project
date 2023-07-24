import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import ProductsListFilter from "../component/UI/ProductListFilter";
import { useParams } from "react-router-dom";
import Products from "../assets/data/Products";

const Search = () => {
    const { keyword } = useParams();

    const [state, setState] = useState({
        keyword: keyword,
        products: [],
        pageCount: 1,
        currentPage: 0,
        pageSize: 20,
    });

    const getData = async (keyword, page) => {
        try {
            let objSearch = {
                keyword,
                pagesize: state.pageSize,
                page: page - 1,
            };
            console.log("objSearch", objSearch);
            let productsRes = await Products.getProductWithSearch(objSearch);
            console.log(productsRes.data);
            setState({
                ...state,
                products: productsRes.data.products || [],
                pageCount: productsRes.data.totalPages,
            });
        } catch (error) { }
    };

    useEffect(() => {
        console.log(pageCount);

    }, [state.pageCount])

    useEffect(() => {
        getData(keyword, state.currentPage);
    }, [keyword]);

    const { products, currentPage, pageCount } = state;

    const handlePageClick = (page) => {
        setState({
            ...state,
            currentPage: page,
        });
        getData(keyword, page);
    };

    const renderPageNumbers = () => {
        if (pageCount === 1) {
            return null;
        }
        const pageNumbers = [];
        for (let i = 1; i <= pageCount; i++) {
            pageNumbers.push(i);
        }
        return (
            <ul className="pagination">
                {pageNumbers.map((number) => (
                    <li
                        key={number}
                        className={
                            number === currentPage ? "page-item active" : "page-item"
                        }
                    >
                        <button
                            className="page-link"
                            onClick={() => handlePageClick(number)}
                        >
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        );
    };



    return (
        <>
            <Container>
                <section className="search_title" style={{ paddingTop: "50px" }}>
                    <h1 className="text-center">Tìm Kiếm</h1>
                </section>
                <section className="product-list">
                    <Container>
                        <Row>
                            <ProductsListFilter products={products} />
                        </Row>
                        <Row>
                            <div>{renderPageNumbers()}</div>
                        </Row>
                    </Container>
                </section>
            </Container>
        </>
    );
};

export default Search;