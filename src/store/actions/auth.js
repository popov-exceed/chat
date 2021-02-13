import typesUser from "../constants/user"
import api from "../../api/auth";

export const login = (userName) =>  dispatch => {
    api.login(userName).then((response) => {
        dispatch({type: typesUser.SING_IN, payload: {user: response.data.name}});
        localStorage.setItem("Token", response.data.token);
    });
};

export const logout = () =>  dispatch => {
    dispatch({type: typesUser.SING_IN});
    localStorage.clear();
};
