import axios, { AxiosError } from 'axios';
import { API_URL } from '../core/Constants';
import AxiosInterceptorMessage from '../components/shared/AxiosInterceptorMessage';
import { Dispatch } from 'redux';
import { ThemeLoadingAction } from '../redux/theme/themeActions';
import { LogoutAction } from '../redux/auth/authActions';
import { History } from 'history';
import { VariantType } from 'notistack';

const defaultOptions = {
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
};

let instance = axios.create(defaultOptions);

//https://stackoverflow.com/questions/51778456/how-to-add-global-loading-spin-effect-in-axios-interceptor-for-a-react-project

export const AxiosInterceptor = (history: History, dispatch: Dispatch, enqueueSnackbar: Function) => {

    instance.interceptors.request.use((config) => {
        dispatch(ThemeLoadingAction(true));
        return config;
    });

    instance.interceptors.response.use(
        (response) => {
            console.log("Response", response);
            setTimeout(() => {
                dispatch(ThemeLoadingAction(false));
            }, 1000);
            
            return response;
        }, (error: AxiosError) => {
            dispatch(ThemeLoadingAction(false));
            if(error.message === 'Network Error' && !error.response){
                //https://bilot.group/articles/using-react-router-inside-axios-interceptors/
                enqueueSnackbar(AxiosInterceptorMessage("Ağ hatası - API servisin çalıştığından emin olun.", error.message), { variant: "error" });
            }
            const status = error.response?.status;
            //const data = error.response?.data;
            //const config = error.response?.config;
    
            if(status === 401){
                dispatch(LogoutAction());
                history.push('/login');

            } else if(status !== 200){
                enqueueSnackbar(AxiosInterceptorMessage("Serviste bir hata oluştu", error.message, status), { variant: "error" });
            }
            
            return Promise.reject(error);
        }
    );
}


export const AxiosTokenInterceptor = (token: string) => {
    instance.interceptors.request.use((config) => {
        config.headers["Authorization"] = token ? `Bearer ${token}` : '';
        return config;
    });
}
//https://stackoverflow.com/questions/59335963/react-hooks-display-global-spinner-using-axios-interceptor
//https://ahmetcaglayan.medium.com/axios-interceptors-typescript-13dc26c61b74



export default instance;