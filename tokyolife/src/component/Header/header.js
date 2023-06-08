import { React, useState } from 'react';
import "./header.css"
import logo from "../../assets/images/logo.png"
import { Container, Row } from 'react-bootstrap';
import ModalSearch from './../Search/modal-search';
// import CartItem from '../CartItem/cartItem.js' ;
import Auth from '../Auth/auth';
import { Link } from 'react-router-dom';
// import products from './../../assets/data/products';

const Header = () => {
    const [isOpenSearch, setIsOpenSearch] = useState(false);

    const [isOpenAuth, setIsOpenAuth] = useState(false);

    const [isOpenCart, setIsOpenCart] = useState(false)

    const toggleSearch = () => setIsOpenSearch(!isOpenSearch);

    const toggleAuth = () => setIsOpenAuth(!isOpenAuth);

    const toggleCart = () => setIsOpenCart(!isOpenCart)


    // const removeProduct = () => {

    // }

    // const updateQuantity = (id , quantity) => {

    // }

    // const totalCost = products.reduce((acc, product) => {
    //     return acc + product.price * product.quantity;
    //   }, 0);


    return <header className="header">
        <Container>
            <ModalSearch isOpen={isOpenSearch} toggle={toggleSearch} />
            <Auth isOpen={isOpenAuth} toggle={toggleAuth} />
            <Row className='d-flex align-items-center menu-main'>

                <div className="nav_warpper w-auto ">
                    <div className="logo">
                        <img src={logo} alt="logo" style={{ height: 65, width: 200 }} />
                    </div>
                </div>
                <div className="navigation w-auto">
                    <ul className="menu d-flex " style={{ listStyle: 'none' }}>
                        <li className="menu women-category">
                            <Link className='women-category'>Nữ</Link>

                            <div className='mega-menu'>
                                <ul>
                                    <h5>Áo</h5>
                                    <li className='sub-menu'><Link>Polo</Link></li>
                                    <li className='sub-menu'><Link>T-shirt</Link></li>
                                    <li className='sub-menu'><Link>Sơ mi</Link></li>
                                    <li className='sub-menu'><Link>Áo khoác</Link></li>
                                    <li className='sub-menu'><Link>Các loại khác</Link></li>
                                </ul>

                                <ul>
                                    <h5>Đầm-Chân váy</h5>
                                    <li className='sub-menu'><Link>Đầm</Link></li>
                                    <li className='sub-menu'><Link>Quần váy</Link></li>
                                </ul>
                                <ul>
                                    <h5>Quần</h5>
                                    <li className='sub-menu'><Link>Quần Short</Link></li>
                                    <li className='sub-menu'><Link>Quần Jean</Link></li>
                                    <li className='sub-menu'><Link>Quần Joggers</Link></li>
                                    <li className='sub-menu'><Link>Quần Joggers</Link></li>
                                    <li className='sub-menu'><Link>Các loại khác</Link></li>
                                </ul>
                                <ul>
                                    <h5>Đồ bộ</h5>
                                    <li className='sub-menu'><Link>Bộ quần áo</Link></li>
                                    <li className='sub-menu'><Link>Bộ quần áo khác</Link></li>
                                    <li className='sub-menu'><Link>Đồ bơi</Link></li>
                                </ul>
                                <ul>
                                    <h5>Áo chống nắng</h5>
                                    <li className='sub-menu'><Link>Áo khoá</Link>c</li>
                                    <li className='sub-menu'><Link>Khẩu trang</Link></li>
                                </ul>
                            </div>

                        </li>
                        <li className="menu man-category">
                            <Link className='man-category'>Nam</Link>
                            <div className='mega-menu'>
                                <ul>
                                    <h5>Áo</h5>
                                    <li className='sub-menu'><Link>Polo</Link></li>
                                    <li className='sub-menu'><Link>T-shirt</Link></li>
                                    <li className='sub-menu'><Link>Sơ mi</Link></li>
                                    <li className='sub-menu'><Link>Áo khoác</Link></li>
                                    <li className='sub-menu'><Link>Các loại khác</Link></li>
                                </ul>

                                <ul>
                                    <h5>Túi-Ví-Balo</h5>
                                    <li className='sub-menu'><Link>Túi-ví</Link></li>
                                    <li className='sub-menu'><Link>Balo</Link></li>
                                </ul>
                                <ul>
                                    <h5>Quần</h5>
                                    <li className='sub-menu'><Link>Quần Short</Link></li>
                                    <li className='sub-menu'><Link>Quần Jean</Link></li>
                                    <li className='sub-menu'><Link>Các loại khác</Link></li>
                                </ul>
                                <ul>
                                    <h5>Giày</h5>
                                    <li className='sub-menu'><Link>Giày thể thao</Link></li>
                                    <li className='sub-menu'><Link>Giày lười</Link></li>
                                    <li className='sub-menu'><Link>Dép</Link></li>
                                </ul>
                                <ul>
                                    <h5>Phụ kiện</h5>
                                    <li className='sub-menu'><Link>Thắt Lưng</Link></li>
                                    <li className='sub-menu'><Link>Tât chân</Link></li>
                                </ul>
                            </div>

                        </li>
                        <li className="menu childrent-category">
                            <Link className='man-category'>Trẻ em</Link>

                            <div className='mega-menu'>
                                <ul>
                                    <h5>Áo chống nắng SunStop</h5>
                                    <li className='sub-menu'><Link>Polo</Link></li>

                                </ul>

                                <ul>
                                    <h5>Áo Polo</h5>
                                </ul>
                                <ul>
                                    <h5>Đồ bộ</h5>
                                    <li className='sub-menu'><Link>Bộ quần áo</Link></li>
                                    <li className='sub-menu'><Link>Đồ bơi</Link></li>
                                </ul>
                                <ul>
                                    <h5>Giày</h5>
                                    <li className='sub-menu'><Link>Giày thể thao</Link></li>
                                    <li className='sub-menu'><Link>Giày lười</Link></li>
                                    <li className='sub-menu'><Link>Dép</Link></li>
                                </ul>
                            </div>

                        </li>
                        <li className="menu housewares-category">
                            <Link className='housewares-category'>Gia dụng</Link>
                            <div className='mega-menu'>
                                <ul>
                                    <h5>Chăn - gối</h5>
                                    <li className='sub-menu'><Link>Chăn</Link></li>
                                    <li className='sub-menu'><Link>Gối</Link></li>

                                </ul>

                                <ul>
                                    <h5>Tinh dầu - đèn xông</h5>
                                    <li className='sub-menu'><Link>Tinh dầu</Link></li>
                                    <li className='sub-menu'><Link>Đèn xông</Link></li>
                                </ul>
                                <ul>
                                    <h5>BÌnh Nước & Bình giữ nhiệt</h5>
                                    <li className='sub-menu'><Link>Bình Nướ</Link>c</li>
                                    <li className='sub-menu'><Link>Bình giữ nhiệt</Link></li>
                                </ul>
                            </div>
                        </li>
                        <li className="menu beauty-category">
                            <Link className='beauty-category'>Làm đẹp</Link>
                            <div className='mega-menu'>
                                <ul>
                                    <h5>Chăm sóc da mặt</h5>
                                    <li className='sub-menu'><Link>Mặt nạ</Link></li>
                                    <li className='sub-menu'><Link>Sữa rửa mặt</Link></li>
                                    <li className='sub-menu'><Link>Dưỡng da</Link></li>
                                    <li className='sub-menu'><Link>Tẩy da chết</Link></li>
                                    <li className='sub-menu'><Link>Nước hoa hồng</Link></li>
                                    <li className='sub-menu'><Link>Xịt khoáng</Link></li>
                                </ul>

                                <ul>
                                    <h5>Trang điểm</h5>
                                    <li className='sub-menu'><Link>Son màu</Link></li>
                                    <li className='sub-menu'><Link>Son dưỡng</Link></li>
                                    <li className='sub-menu'><Link>Nước tẩy trang</Link></li>
                                    <li className='sub-menu'><Link>Phụ kiện trang điểm</Link></li>
                                </ul>
                                <ul>
                                    <h5>Chăm sóc cơ thể</h5>
                                    <li className='sub-menu'><Link>Sữa tắm</Link></li>
                                    <li className='sub-menu'><Link>Xà phòng tắm</Link></li>
                                    <li className='sub-menu'><Link>Kem/Xịt chống nắng</Link></li>
                                    <li className='sub-menu'><Link>Kem/Sữa dưỡng da</Link></li>
                                    <li className='sub-menu'><Link>Lăng khữ mùi</Link></li>
                                </ul>
                            </div>
                        </li>
                        <li className="menu shop-category">Cửa hàng</li>
                        <li className="menu new-category">
                            <Link className='new-category'>Tin tức</Link>
                            <div className='mega-menu'>
                                <ul>
                                    <h5>Tin sự kiện</h5>
                                </ul>
                                <ul>
                                    <h5>Tin ưu đãi</h5>
                                </ul>
                            </div>

                        </li>
                    </ul>
                </div>

                <div className="header-wrap-search w-auto" onClick={() => {
                    setIsOpenSearch(true)
                }}>
                    <i className='fa fa-search'></i>
                </div>
                <div className='header-wrap-action w-auto'>
                    <div className="header-action d-flex">
                        <div className="header-item-action header-account">
                            <div className="header-action_text">
                                <div title='Tài khoản' className="header-action_link header-action_click d-flex flex-column"
                                    aria-label='Tài khoản'
                                    style={{ textDecoration: "none" }}
                                    onClick={() => {
                                        setIsOpenAuth(true)
                                    }}>
                                    <i className='fa-regular fa-user d-flex justify-content-center'></i>
                                    <span className='box-text text-dark'>Tài khoản</span>
                                </div>
                            </div>
                            <div className="header-action_dropdown"></div>
                        </div>
                        <div className='header-item-action header-cart d-flex justify-content-center align-items-center flex-column'>
                            <div className='cart-icon' onClick={toggleCart}>
                                <i className='fa fa-cart-shopping d-flex justify-content-center'></i>
                                <span className='box-text'>Giỏ hàng</span>
                                <span className='cart__icon'>
                                    <span className='badge'>1</span>
                                </span>
                            </div>
                            {/* {isOpenCart && (
                                <div className="cart-dropdown">
                                    {products.map((product) => (
                                        <CartItem
                                            key={product.id}
                                            item={product}
                                            removeProduct={removeProduct}
                                            updateQuantity={updateQuantity}
                                        />
                                    ))}
                                    <div className="cart-total">Tổng: ${totalCost}</div>
                                    <button className="checkout-button">Thanh toán</button>
                                </div>
                            )} */}

                        </div>
                    </div>
                </div>
            </Row>
        </Container>
    </header>

}

export default Header;