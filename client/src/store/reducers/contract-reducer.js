import {
    CONTRACT_SUCCESS,
    CONTRACT_LOADING,
    CONTRACT_ERROR,
} from "../actions/contract-action";

const initialState = {
    loading: false,
    error: null,
    contract: null,
};

const contractReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONTRACT_SUCCESS:
            return { ...state, contract: action.payload, loading: false };
        case CONTRACT_LOADING:
            return { ...state, loading: true };
        case CONTRACT_ERROR:
            return { ...state, error: action.error, loading: false };
        default:
            return state;
    }
};

export default contractReducer;
