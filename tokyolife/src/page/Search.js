import React from "react";
import { Container, Row } from "react-bootstrap";
import ProductsListFilter from "../component/UI/ProductListFilter";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Products from "../assets/data/Products";
import { useState } from "react";


const Search = () => {
    const { keyword } = useParams();

    const [state, setState] = useState({
        keyword: keyword,
        products: [],
        pageCount: 0,
        currentPage: 0,
        pageSize: 5,
    });

    useEffect(() => {
        async function getData(keyword, page) {
            try {
                let productsRes = await Products.getProductWithSearch({
                    keyword,
                    pagesize: 5,
                    page,
                });
                setState({
                    ...state,
                    products: productsRes.data.products || [],
                    pageCount: Math.ceil(productsRes.data.total / 5),
                });
            } catch (error) { }
        }
        getData(keyword, 0);
    }, [keyword]);

    const { products, currentPage, pageCount } = state;

    const handlePageClick = (page) => {
        setState({ ...state, currentPage: page });
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= pageCount; i++) {
            pageNumbers.push(i);
        }
        return (
            <ul className="pagination">
                {pageNumbers.map((number) => (
                    <li
                        key={number}
                        className={number === currentPage ? 'page-item active' : 'page-item'}
                    >
                        <button className="page-link" onClick={() => handlePageClick(number)}>
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
                <section className="search_title" style={{ paddingTop: '50px' }}>
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

export default Search