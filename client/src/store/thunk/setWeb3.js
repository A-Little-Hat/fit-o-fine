import { web3Loading, web3Error, web3Success } from "../actions/web3-action";
import { contractSuccess } from "../actions/contract-action";
import Web3 from "web3";
export const setWeb3 = (abi, address) => {
    return async (dispatch) => {
        dispatch(web3Loading());
        let web3 = null;
        if (window.ethereum)
            try {
                await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                web3 = new Web3(window.ethereum);
            } catch (e) {
                dispatch(web3Error(e.message));
                return;
            }
        else if (window.web3) web3 = new Web3(window.web3.currentProvider);
        else web3 = new Web3("http://127.0.0.1:7545/");
        let contract = new web3.eth.Contract(abi, address);
        dispatch(contractSuccess(contract));
        dispatch(web3Success(web3));
    };
};
