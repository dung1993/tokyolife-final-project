import axios from "axios";

import API_URL from '../../constant/APP_CONSTANT';

class ProductImports {
    static getAllColorByProductImportAndCategory(categoryId) {
        return axios.get(API_URL + "product-import/color/category/" + categoryId)
    }

    static getAllSizeByProductImportAndCategory(categoryId) {
        return axios.get(API_URL + "product-import/size/category/" + categoryId)
    }

}

export default ProductImports