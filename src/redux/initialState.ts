import { AuthState } from "./auth/authTypes";
import { ThemeState } from "./theme/themeTypes";

export default interface State {
    authReducers: AuthState;
    themeReducers: ThemeState;
}