import { ActionTypes, ThemeState, ThemeActions } from "./themeTypes";


const initialState: ThemeState = {
    menuOpen: true,
    darkMode: false
};

const reducer = (
    state: ThemeState = initialState,
    action: ThemeActions
): ThemeState => {
    switch (action.type) {
        case ActionTypes.TOGGLE_MENU:
            return { 
                ...state,
                menuOpen: !state.menuOpen
            };
        case ActionTypes.DARK_MODE:
            return { 
                ...state,
                darkMode: !state.darkMode
            };
        default:
            return state;
    }
};

export default reducer;