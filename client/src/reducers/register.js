import { AUTH, LOGOUT } from "../types";

const auth = (state={authData : null},action) =>{
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile',JSON.stringify({...action?.data}))
            return { ...state, authData : action?.data, loading : false, error:null};
        case LOGOUT:
            localStorage.clear()
            return { ...state, authData : null, loading : false, error : null}
        default:
            return state;
    }
}

export default auth;