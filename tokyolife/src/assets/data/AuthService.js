import axios from "axios";
import API_URL from "../../constant/APP_CONSTANT";

class AuthService {
    static postRegisterInformation(data) {
        return axios.post(API_URL + `auth/client/register/`, data)
    }

    static postLogin(data) {
        return axios.post(API_URL + `auth/login/`, data)
    }
}

export default AuthService