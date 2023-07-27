import axios from "axios";
import API_URL from "../../constant/APP_CONSTANT";
import Cart from './../../page/Cart';

class CartService {
    static getCartToCheckOut(data) {
        return axios.post(API_URL + `carts/add`, data)
    }
}

export default CartService