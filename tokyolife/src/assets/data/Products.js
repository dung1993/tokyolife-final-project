import axios from "axios";

import API_URL from '../../constant/APP_CONSTANT';


class Products {
    static getProduct() {
        return axios.get(API_URL + 'products')
    }

    static getProductById(productId) {
        return axios.get(API_URL + 'products/' + productId)
    }

    static getProductByCategoryId(categoryId) {
        return axios.get(API_URL + 'client/products/category?id=' + categoryId)
    }

    static getProductWithDiscount() {
        return axios.get(API_URL + 'client/products/discount-time')

    }

    static postProductByCategoryId(categoryId) {
        return axios.post(API_URL + 'client/products/category?id=' + categoryId)
    }

    static getAllProductFilter(categoryId) {
        return axios.post(API_URL + 'client/products/filter/category/' + categoryId)
    }
}


export default Products;