const initialState = {list: []};

export function getOnlineUsers(state = initialState, {payload, type}) {
    switch (type) {
        case "GET_USERS":
            return {...state, list: [...state.list, ...payload.users]};
        case "NEW_USER":
            return {...state, list: [...state.list, payload.user]};
        default:
            return state;
    }
}
