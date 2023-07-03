import React, { useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Routers from "../../routers/Router";


const Layout = () => {
    const [cartDetail , setCartDetail] = useState()
    return (
        <>
            <Header cartDetail={cartDetail} />
            <div>
                <Routers setCartDetail={setCartDetail} />
            </div>
            <Footer />
        </>
    )
}
export default Layout