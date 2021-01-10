import axios, { AxiosError } from 'axios';
import { API_URL } from '../core/Constants';
import AxiosInterceptorMessage from '../components/shared/AxiosInterceptorMessage';
import { Dispatch } from 'redux';
import { ThemeLoadingAction } from '../redux/theme/themeActions';

const defaultOptions = {
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
};

let reduxDispatch: Dispatch;
let instance = axios.create(defaultOptions);

//https://stackoverflow.com/questions/51778456/how-to-add-global-loading-spin-effect-in-axios-interceptor-for-a-react-project
//+ olarak servisten 401 geldiğinde otomatik login sayfasına atacağız.

instance.interceptors.response.use(
    (response) => {
        console.log("Response", response);
        setTimeout(() => {
            reduxDispatch(ThemeLoadingAction(false));
        }, 1000);
        
        return response;
    }, (error: AxiosError) => {
        if(error.message === 'Network Error' && !error.response){
            //https://bilot.group/articles/using-react-router-inside-axios-interceptors/
            AxiosInterceptorMessage("Ağ hatası - API servisin çalıştığından emin olun.", error.message);
        }
        const status = error.response?.status;
        //const data = error.response?.data;
        //const config = error.response?.config;

        if(status !== 200){
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

export const axiosRequestLoading = (dispatch: Dispatch) => {
    reduxDispatch = dispatch;
    instance.interceptors.request.use((config) => {
        reduxDispatch(ThemeLoadingAction(true));
        return config;
    });
}

export default instance;