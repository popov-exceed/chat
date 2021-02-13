import userTypes from "../constants/user";
const initialState = { loggedIn: false, user: null, token: localStorage.getItem("Token") };

export function authentication(state = initialState, {payload, type}) {
    switch (type) {
        case userTypes.SING_IN:
            return {...state, loggedIn: true, user: payload.user, token: payload.token}
        default:
            return state
    }
}
