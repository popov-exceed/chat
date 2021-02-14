const initialState = {list: []};

export function getOnlineUsers(state = initialState, {payload, type}) {
    switch (type) {
        case "GET_USERS":
            return {...state, list: payload.users};
        case "NEW_USER":
            if (state.list.find(user => user._id == payload.user.id)){
                return state;
            }
            return {...state, list: [...state.list, payload.user]};

        case "LEAVE_USER":
            return {...state, list: state.list.slice().filter((user)=> user._id !== payload.user.id)}
        default:
            return state;
    }
}
