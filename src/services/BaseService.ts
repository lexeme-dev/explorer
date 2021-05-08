import axios, { AxiosInstance } from "axios";
import { API_URL } from "./ServiceConstants";
import qs from "qs";

class BaseService {
    axios: AxiosInstance;

    constructor() {
        this.axios = axios.create({
            baseURL: API_URL,
            paramsSerializer: (params) =>
                qs.stringify(params, { arrayFormat: "repeat" }),
        });
    }
}

export default BaseService;
