export const WEB3_LOADING = "WEB3_LOADING";
export const WEB3_SUCCESS = "WEB3_SUCCESS";
export const WEB3_ERROR = "WEB3_ERROR";

export const web3Success = (web3) => {
    return {
        type: WEB3_SUCCESS,
        payload: web3,
    };
};
export const web3Loading = () => {
    return {
        type: WEB3_LOADING,
    };
};
export const web3Error = (error) => {
    return {
        type: WEB3_ERROR,
        payload: error,
    };
};
