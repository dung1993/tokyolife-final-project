import React, { useState } from "react";

import { Routes, Route } from 'react-router-dom'

import Home from "../page/Home"
import Shop from "../page/Shop"
import Checkout from "../page/Checkout"
import ProductDetails from "../page/ProductDetails"
import Search from "../page/Search";
import Cart from "../page/Cart"
import ListProductWithCategory from "../page/ListProductWithCategory"

import Report from "../page/Report";

import Register from './../page/Register';
import Account from './../page/Account';



const Routers = ({ cartDetail, setCartDetail }) => {
    const [products, setProducts] = useState();
    const [totalAmountCart, setTotalAmountCart] = useState(0);

    return <Routes>
        <Route path="/" element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="/checkout" element={<Checkout totalAmountCart={totalAmountCart} products={products} />} />
        <Route path="/chi-tiet-san-pham/:productId" element={<ProductDetails setCartDetail={setCartDetail} />} />
        <Route path="/cart" element={<Cart totalAmountCart={totalAmountCart} setTotalAmountCart={setTotalAmountCart} products={products} setProducts={setProducts} />} />
        <Route path="/search/:keyword" element={<Search />} />
        <Route path="/account" element={<Account />} />
        <Route path="products/category/:categoryId" element={<ListProductWithCategory />} />

        <Route path="signup" element={<Signup />} />
        <Route path="/report" element={<Report />} />

        <Route path="/register" element={<Register />} />

    </Routes>


}
export default Routers;