import userTypes from "../constants/user";
const initialState = {list: [{
        author: "Alex",
        content: "Hi"
    }]};

export function message(state = initialState, {payload, type}) {
    console.log(payload)
    switch (type) {
        case "GET_MESSAGE":
            return {...state, list: [...state.list, payload.messages]}
        case "NEW_MESSAGE":
            return {...state, list: [...state.list, {content: payload.message, author: "Alex"}]}
        default:
            return state
    }
}
