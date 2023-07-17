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

    static getAllProductFilter(data) {
        return axios.post(API_URL + 'client/products/filter/category?sort=' + data.sort, data)
    }

    static getProductWithSearch(data) {
        console.log(data);
        return axios.post(API_URL + 'client/products/search?size=' + data.pagesize + '&page=' + data.page + '&keyword=' + data.keyword)
    }
    // static getProductWithSearch(pagesize, page, keyword) {
    //     console.log(API_URL + 'client/products/search?size=' + pagesize + '&page=' + page + '&keyword=' + keyword);
    //     return axios.post(API_URL + 'client/products/search?size=' + pagesize + '&page=' + page + '&keyword=' + keyword)
    // }

}


export default Products;