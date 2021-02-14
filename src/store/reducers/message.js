import userTypes from "../constants/user";
const initialState = {list: []};

export function message(state = initialState, {payload, type}) {
    switch (type) {
        case "GET_MESSAGES":
            return {...state, list: [...state.list, ...payload.messages]};
        case "NEW_MESSAGE":
            return {...state, list: [...state.list, payload.message]}
        default:
            return state
    }
}
