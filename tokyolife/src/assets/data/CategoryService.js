import axios from 'axios';
import API_URL from '../../constant/APP_CONSTANT';

class CategoryService {
    static getCategory() {
        return axios.get(API_URL + 'categories/get')
    }

    static getCategoryById(id) {
        return axios.get(API_URL + 'categories=' + id)
    }

    static getAllCategory(){
        return axios.get(API_URL + 'categories')
    }

    static getAllCategoryByStatus(status) {
        return axios.get(API_URL + 'categories/status=' + status)
    }
}
export default CategoryService
