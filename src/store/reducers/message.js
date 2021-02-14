import userTypes from "../constants/user";
const initialState = {list: []};

export function message(state = initialState, {payload, type}) {
    switch (type) {
        case "GET_MESSAGES":
            return {...state, list: payload.messages};
        case "NEW_MESSAGE":
            return {...state, list: [...state.list, payload.message]}
        case "READ_MESSAGE":

            return {...state, list: state.list.map((message) => {
                    if (message._id === payload.messageId) {
                        return Object.assign({}, message, {
                            read: true
                        });
                    }
                    return message;
                })};
        default:
            return state
    }
}
