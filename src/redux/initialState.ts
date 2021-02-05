import { IAuthState } from "./auth/authTypes";
import { IThemeState } from "./theme/themeTypes";

export default interface State {
    authReducers: IAuthState;
    themeReducers: IThemeState;
}