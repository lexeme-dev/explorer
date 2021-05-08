import axios, { AxiosInstance } from 'axios';
import qs from 'qs';
import { API_URL } from './ServiceConstants';

class BaseService {
    axios: AxiosInstance;

    constructor() {
        this.axios = axios.create({
            baseURL: API_URL,
            paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
        });
    }
}

export default BaseService;
