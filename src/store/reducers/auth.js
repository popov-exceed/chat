import userTypes from "../constants/user";
const initialState = { user: localStorage.getItem("User") ? JSON.parse(localStorage.getItem("User")): null, token: localStorage.getItem("Token") };

export function authentication(state = initialState, {payload, type}) {
    switch (type) {
        case userTypes.SING_IN:
            return {...state, user: payload.user, token: payload.token}
        case userTypes.LOGOUT:
            return { user: null, token: "" };
        default:
            return state
    }
}
