import { React, useEffect, useState } from 'react';
import "./header.css"
import logo from "../../assets/images/logo.png"
import { Container, Row } from 'react-bootstrap';
import ModalSearch from '../Search/Modal-search';
import Auth from '../Auth/Auth';
import { Link } from 'react-router-dom';
import CategoryService from '../../assets/data/CategoryService';


const Header = ({ cartDetail }) => {


    const [isOpenSearch, setIsOpenSearch] = useState(false);

    const [isOpenAuth, setIsOpenAuth] = useState(false);

    const [isOpenCart, setIsOpenCart] = useState(false)

    const toggleSearch = () => setIsOpenSearch(!isOpenSearch);

    const toggleAuth = () => setIsOpenAuth(!isOpenAuth);

    const toggleCart = () => setIsOpenCart(!isOpenCart)

    const [state, setState] = useState({
        categories: [],
        products: []

    })


    useEffect(() => {
        try {
            setState({ ...state });
            async function getData() {
                let categoriesRes = await CategoryService.getAllCategory();
                setState({
                    ...state,
                    categories: categoriesRes.data,
                })
            }
            getData();
        } catch (error) {

        }
    }, [])




    return <>

        <header className="header">
            <Container>
                <ModalSearch isOpen={isOpenSearch} toggle={toggleSearch} />
                <Auth isOpen={isOpenAuth} toggle={toggleAuth} />
                <Row className='d-flex align-items-center menu-main'>

                    <div className="nav_warpper w-auto ">
                        <div className="logo">
                            <Link to={"/"}><img src={logo} alt="logo" style={{ height: 65, width: 200 }} /></Link>
                        </div>
                    </div>
                    <div className="navigation w-auto">
                        <ul className="menu d-flex " style={{ listStyle: 'none' }}>
                            {state.categories?.map(e => {
                                return <li className="menu category">
                                    <Link className='category' >{e.name}</Link>
                                    <div className='mega-menu'>
                                        {e?.categoryChilds?.map(c => { return < Link key={c.id.toString()} to={`products/category/${c.id}`} state={{ id: c.id }}><ul className='sub-menu'>{c.name}</ul></Link> }

                                        )}
                                    </div>


                                </li>
                            }
                            )}
                            <li className="menu category">Cửa hàng</li>
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
                                    <span className='box-text'><a href="http://localhost:3000/cart">Giỏ hàng</a></span>
                                    <span className='cart__icon'>
                                        <span className='badge'>
                                            {cartDetail}
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Row>
            </Container>
        </header >

    </>


}

export default Header;