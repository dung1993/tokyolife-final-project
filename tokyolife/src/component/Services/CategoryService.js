import axios from 'axios';
import API_URL from '../../constant/APP_CONSTANT';

class CategoryService {
    static getCategory(){
        return axios.get(API_URL + 'categories/get' )
    }

    static getCategoryById(id){
        return axios.get(API_URL + 'categories=' + id)
    }
}
export default CategoryService
