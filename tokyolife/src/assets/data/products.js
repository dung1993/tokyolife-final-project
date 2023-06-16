import axios from "axios";

import API_URL from './../../constant/APP_CONSTANT';


class Products{
    static getProduct(){
        return axios.get(API_URL + 'products/')
    }

    static getProductById(productId){
        return axios.get(API_URL + 'products/' + productId)
    }
}


export default Products;