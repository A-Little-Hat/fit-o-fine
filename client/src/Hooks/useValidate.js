import { useState } from "react";
// required|number|string|email|confirm_password|name|mobile|age18|UIDAI
const prevStateConverter = (data, old = null) => {
    if (old !== null) {
        for (let [key] of Object.entries(data)) {
            if (old[key] !== undefined) data[key].value = old[key];
        }
    }
    return data;
};

const useValidate = (value, old = null) => {
    const [state, setState] = useState(prevStateConverter(value, old));
    const checkRequired = (value) => {
        if (
            value === undefined ||
            value === null ||
            value.length === 0 ||
            value === "null"
        )
            return { valid: false, message: "This field can not be empty" };
        else return { valid: true, message: null };
    };
    const checkNumber = (value) => {
        if (!isNaN(value)) return { valid: true, message: null };
        else return { valid: false, message: "This field must be a number" };
    };
    const checkString = (value) => {
        if (typeof value === "string") return { valid: true, message: null };
        else return { valid: false, message: "This field must be a string" };
    };

    const checkReportDate = (value) => {
        let today = new Date();
        let reportDate = new Date(value);
        // let diff = today.getFullYear() - birthDate.getFullYear();
        if (reportDate <= today) return { valid: true, message: null };
        else return { valid: false, message: "Report Date should be upto today" };
    };

    const checkMobile = (value) => {
        if (value.length === 10) return { valid: true, message: null };
        else
            return {
                valid: false,
                message: "Please enter a valid Mobile Number",
            };
    };

    

    const checkEmail = (value) => {
        if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value))
            return { valid: true, message: null };
        else
            return {
                valid: false,
                message: "Please enter a valid email address",
            };
    };
    const checkConfirmPassword = (password, confirmPassword) => {
        if (password === confirmPassword) return { valid: true, message: null };
        return { valid: false, message: "Password does not match" };
    };
    const validOnChange = ({ value, name }, callback = null) => {
        let oldState = { value: value };
        let validation = state[name].validate;
        if (validation) {
            let validate = validateField(validation.split("|"), value);
            oldState.error = validate.message;
        }
        if (callback !== null) callback(value, name, setState);
        // change state accordingly
        setState((prev) => {
            prev[name] = { ...prev[name], ...oldState };
            return { ...prev };
        });
    };
    const validateField = (validation, value) => {
        let validMsg = { valid: true, message: null };
        for (let i = 0; i < validation.length; i++) {
            let type = validation[i];
            switch (type) {
                case "required":
                    validMsg = checkRequired(value);
                    break;
                case "number":
                    validMsg = checkNumber(value);
                    break;
                case "string":
                    validMsg = checkString(value);
                    break;
                case "email":
                    validMsg = checkEmail(value);
                    break;
                case "reportdate":
                    validMsg = checkReportDate(value);
                    break;
                case "mobile":
                    validMsg = checkMobile(value);
                    break;
               
                case "confirm_password":
                    validMsg = checkConfirmPassword(
                        value,
                        state["password"].value
                    );
                    break;
                default:
                    validMsg = { valid: true, message: null };
            }
            if (!validMsg.valid) break;
        }
        return validMsg;
    };
    const validate = () => {
        let flag = true;
        let oldState = { ...state };
        for (let [key] of Object.entries(oldState)) {
            let data = oldState[key];
            let validate = validateField(data.validate.split("|"), data.value);
            if (!validate.valid) flag = false;
            data.error = validate.message;
        }
        if (!flag) setState({ ...oldState });
        return flag;
    };

    const generalize = () => {
        let response = {};
        for (let [key, data] of Object.entries({ ...state })) {
            response[key] = data.value;
        }
        return response;
    };
    const reset = () => {
        setState(value);
    };
    return [state, { validate, validOnChange, generalize, reset }];
};

export default useValidate;
