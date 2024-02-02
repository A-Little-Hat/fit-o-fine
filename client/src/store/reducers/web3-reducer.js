import { WEB3_ERROR, WEB3_LOADING, WEB3_SUCCESS } from "../actions/web3-action";

const initialState = {
    loading: false,
    error: null,
    web3: null,
};

const web3Reducer = (state = initialState, action) => {
    switch (action.type) {
        case WEB3_SUCCESS:
            return { ...state, web3: action.payload, loading: false };
        case WEB3_LOADING:
            return { ...state, loading: true };
        case WEB3_ERROR:
            return { ...state, error: action.error, loading: false };
        default:
            return state;
    }
};

export default web3Reducer;
