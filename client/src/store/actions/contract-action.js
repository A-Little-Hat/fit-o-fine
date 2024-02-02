export const CONTRACT_SUCCESS = "CONTRACT_SUCCESS";
export const CONTRACT_LOADING = "CONTRACT_LOADING";
export const CONTRACT_ERROR = "CONTRACT_ERROR";

export const contractSuccess = (contract) => {
    return {
        type: CONTRACT_SUCCESS,
        payload: contract,
    };
};

export const contractError = (error) => {
    return {
        type: CONTRACT_ERROR,
        payload: error,
    };
};

export const contractLoading = () => {
    return {
        type: CONTRACT_LOADING,
    };
};
