import React from "react";
import Products from "../../assets/data/Products";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Container, Row } from 'react-bootstrap';
import logo from "../../assets/images/logo.png";
import "./modal-search.css"
import { useState } from "react";
import { useEffect } from "react";
import ProductWithSearch from "../UI/ProductWithSearch";
import { useRef } from "react";
import { Link } from "react-router-dom";


const ModalSearch = ({ isOpen, toggle }) => {

    const [state, setState] = useState({
        keyword: '',
        products: [],
    })

    const handleSubmit = (e) => {
        e.preventDefault();

    }

    const handleChange = (e) => {

        handleSearch(e.target.value)
    }

    const handleClose = () => {
        toggle();
    }


    const handleSearch = (keyword) => {
        async function getData(keyword) {
            let productsRes = await Products.getProductWithSearch({ keyword, pagesize: 5, page: 0 })
            console.log(productsRes)
            setState({
                ...state,
                products: productsRes.data.products || []
            })
        }
        getData(keyword);
    }

    const searchRef = useRef();


    return (
        <div>
            <Modal className="modal__search modal-xl" isOpen={isOpen} toggle={toggle}>
                <ModalHeader toggle={toggle}>
                    <Container>
                        <Row className="modal__header">
                            <div className="nav_warpper w-auto">
                                <div className="logo">
                                    <img src={logo} alt="logo" style={{ height: 65, width: 200 }} />
                                </div>
                            </div>
                            <div className="input__search">
                                <i className="fa fa-search icon__search"></i>
                                <input type="text" name="keyword" id="keyword" ref={searchRef} placeholder="Tìm kiếm sản phẩm" onChange={(e) => { handleChange(e) }} />
                            </div>
                        </Row>
                    </Container>
                </ModalHeader>
                <ModalBody>
                    <div className="search__product">
                        {state.products?.map(product => { return <ProductWithSearch product={product} handleClose={handleClose} /> })}
                        {state.products?.length > 0 && <Link to={`/search/${searchRef.current?.value}`} state={{ keyword: searchRef.current?.value }} style={{ display: "flex", justifyContent: "center" }} onClick={handleClose}>Xem thêm</Link>}
                    </div>
                </ModalBody>
            </Modal>
        </div>
    );
}

export default ModalSearch