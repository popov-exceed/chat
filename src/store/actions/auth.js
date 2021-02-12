import typesUser from "../constants/user"
import api from "../../api/chat";

export const login = (userName) =>  dispatch => {
    const socket = api.singIn(userName);
    console.log(socket);
    dispatch({type: typesUser.SING_IN});

};

export const logout = () =>  dispatch => {
    dispatch({type: typesUser.SING_IN});
};
