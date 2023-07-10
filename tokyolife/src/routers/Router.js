import React, {useState} from "react";

import { Routes, Route } from 'react-router-dom'

import Home from "../page/Home"
import Shop from "../page/Shop"
import Checkout from "../page/Checkout"
import ProductDetails from "../page/ProductDetails"
import Cart from "../page/Cart"
import Login from "../page/Login"
import Signup from "../page/Signup"
import ListProductWithCategory from "../page/ListProductWithCategory"

const Routers = ({setCartDetail}) =>{
   
    const [totalAmountCart, setTotalAmountCart] = useState(0);
    
    return <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="shop" element={<Shop/>}/>
                <Route path="/checkout" element={<Checkout/>}/>
                <Route path="/productdetails/:productId" element={<ProductDetails  setCartDetail={setCartDetail}/>}/>
                <Route path="/cart" element={<Cart totalAmountCart={totalAmountCart} setTotalAmountCart={setTotalAmountCart} />}/>
                <Route path="login" element={<Login/>}/>
                <Route path="products/category/:categoryId" element={<ListProductWithCategory />} />
                <Route path="signup" element={<Signup/>}/>
            </Routes>

}
export default Routers;