import { USER_ADD, USER_REMOVE } from "../actions/user-action";

const userReducer = (state = null, action) => {
    switch (action.type) {
        case USER_ADD:
            return action.payload;
        case USER_REMOVE:
            return null;
        default:
            return state;
    }
};

export default userReducer;
