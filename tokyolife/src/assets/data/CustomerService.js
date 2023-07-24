import axios from "axios";
import API_URL from "../../constant/APP_CONSTANT";

class CustomerService {
    static getCustomerByUserName(username) {
        return axios.get(API_URL + `customer`, { params: { username } })
    }
}

export default CustomerService