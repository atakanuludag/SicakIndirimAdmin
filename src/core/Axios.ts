import axios from 'axios';
import { API_URL } from '../core/Constants';

const defaultOptions = {
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
};

let instance = axios.create(defaultOptions);

export const axiosInterceptor = (token: string) => {
    instance.interceptors.request.use(function (config) {
        config.headers.token =  token ? token : '';
        return config;
    });
}

export default instance;