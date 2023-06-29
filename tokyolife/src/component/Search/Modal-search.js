import React from "react";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Container, Row } from 'react-bootstrap';
import logo from "../../assets/images/logo.png";
import "./modal-search.css"

const ModalSearch = ({ isOpen, toggle }) => {

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
                                <input type="text" name="search" id="search" placeholder="Tìm kiếm sản phẩm" />
                            </div>
                        </Row>
                    </Container>
                </ModalHeader>
                <ModalBody>
                    <div className="search__product"></div>
                </ModalBody>
            </Modal>
        </div>
    );
}

export default ModalSearch