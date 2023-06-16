import { React, useEffect, useState } from 'react';
import "./header.css"
import logo from "../../assets/images/logo.png"
import { Container, Row } from 'react-bootstrap';
import ModalSearch from '../Search/Modal-search';
import Auth from '../Auth/Auth';
import { Link } from 'react-router-dom';
import CategoryService from '../Services/CategoryService';

const Header = () => {
    const [isOpenSearch, setIsOpenSearch] = useState(false);

    const [isOpenAuth, setIsOpenAuth] = useState(false);

    const [isOpenCart, setIsOpenCart] = useState(false)

    const toggleSearch = () => setIsOpenSearch(!isOpenSearch);

    const toggleAuth = () => setIsOpenAuth(!isOpenAuth);

    const toggleCart = () => setIsOpenCart(!isOpenCart)

    const [state, setState] = useState({
        categories: [],
    })

    useEffect(() => {
        try{
            setState({...state});
            async function getData(){
                let categoriesRes = await CategoryService.getCategory();
                setState({
                    ...state,
                    categories: categoriesRes.data,
                })
            }
            getData();
        }catch(error){

        }
    },[])


    // const removeProduct = () => {

    // }

    // const updateQuantity = (id , quantity) => {

    // }

    // const totalCost = products.reduce((acc, product) => {
    //     return acc + product.price * product.quantity;
    //   }, 0);
    useEffect(e => {
        // console.log(state)
    },[state])
    

    return <>
            
            <header className="header">
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
                            {state.categories?.map(e => <li className="menu category">
                                <Link className='category'>{e.name}</Link>
                                <div className='mega-menu'>
                                {e.categoryChilds.map(c => 
                                   
                                    <ul className='sub-menu'>{c.name}</ul>
                                   
                                )}
                                 </div>
    
                            </li>
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
                                    <span className='box-text'>Giỏ hàng</span>
                                    <span className='cart__icon'>
                                        <span className='badge'>1</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Row>
            </Container>
        </header>

        </>    
    
    
}

export default Header;