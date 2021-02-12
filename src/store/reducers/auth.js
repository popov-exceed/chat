import userTypes from "../constants/user";
const initialState = { loggedIn: true, user: null };

export function authentication(state = initialState, {payload, type}) {
    switch (type) {
        case userTypes.SING_IN:
            return {...state, loggedIn: true}
        default:
            return state
    }
}
