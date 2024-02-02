export const USER_ADD = "USER_ADD";
export const USER_REMOVE = "USER_REMOVE";

export const userRemove = () => {
    return {
        type: USER_REMOVE,
    };
};
export const userAdd = (user) => {
    return {
        type: USER_ADD,
        payload: user,
    };
};
