import typesUser from "../constants/user"
import api from "../../api/auth";

export const login = (userName) =>  dispatch => {
    api.login(userName).then((response) => {
        dispatch({type: typesUser.SING_IN, payload: {token: response.data.token, user: response.data.user}});
        localStorage.setItem("Token", response.data.token);
        localStorage.setItem("User", JSON.stringify(response.data.user));
    }, (err) => dispatch({type: "ERROR", payload: {error: err}})) ;
};

export const logout = () =>  dispatch => {
    dispatch({type: typesUser.LOGOUT});
    localStorage.clear();
};
