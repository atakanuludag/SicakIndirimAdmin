import axios from '../core/Axios';
import IAuth from '../interfaces/IAuth';

export default class AuthService {

    getToken = async (state: any): Promise<IAuth | null> => {
        try {
            const ret = await axios.post(`/user/login`, {
                username: state.username,
                password: state.password
            })
            return ret.data ? ret.data : null;
        }
        catch(err){
            console.log("AuthService getToken() Err", err);
            return null;
        }
    }

}