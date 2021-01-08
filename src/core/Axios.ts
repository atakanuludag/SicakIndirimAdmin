import axios, { AxiosError } from 'axios';
import { API_URL } from '../core/Constants';
import AxiosInterceptorMessage from '../utils/AxiosInterceptorMessage';

const defaultOptions = {
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
};

let instance = axios.create(defaultOptions);

instance.interceptors.response.use(
    (response) => {
        console.log("Response", response);
        return response;
    }, (error: AxiosError) => {
        if(error.message === 'Network Error' && !error.response){
            //https://bilot.group/articles/using-react-router-inside-axios-interceptors/
            AxiosInterceptorMessage("Serviste bir hata oluştu", error.message);
        }
        const status = error.response?.status;
        //const data = error.response?.data;
        //const config = error.response?.config;

        if(status != 200){
            AxiosInterceptorMessage("Serviste bir hata oluştu", error.message, status);
        }
        
        //return Promise.reject(error);
    }
);

export const axiosTokenInterceptor = (token: string) => {
    instance.interceptors.request.use((config) => {
        config.headers["Authorization"] = token ? `Bearer ${token}` : '';
        return config;
    });
}

export default instance;