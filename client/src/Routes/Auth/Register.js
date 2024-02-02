import React, { useState } from "react";
import useValidate from "../../Hooks/useValidate";
import { userAdd } from "../../store/actions";
import { connect } from "react-redux";
const Register = ({  web3,addUser,orgContract }) => {
    const [selectedValue, setSelectedValue] = useState('');
    const handleDropdownChange = (e1) => {
        setSelectedValue(e1);
      };
      
   const [formData, formValidator] = useValidate({
        name: {
            value: "",
            validate: "required|string",
            error: null,
        },
        addr: { 
            value: "", 
            validate: "required|string",
             error: null 
        },
        email: {
            value: "",
            validate: "required|email",
            error: null,
        },
       
        con: {
            value: "",
            validate: "required|number",
            error: null,
        },
        typ: {
            value: "",
            validate: "required|string",
            error: null,
        },
    
    });
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const handleChange = (e) => {
        e.preventDefault();
        formValidator.validOnChange(e.currentTarget);
    };

    const handleSubmit = async (e) => {
        
        e.preventDefault();
      
        if (!formValidator.validate()) return;
        setLoading(true);
        setError(null);
        setSuccess(null);
        let address = await window.ethereum.request({
            method: "eth_accounts",
        });
        console.log(orgContract);
        orgContract.contract.methods.register(
                formData.name.value,
                formData.addr.value,
                formData.email.value,
                formData.con.value,
                formData.typ.value
                
            )
            .send({ from: address[0] })
            .then((data) => {
                setLoading(false);
                setSuccess("Successfully register waiting for conformation!!!");
            })
            .catch((e) => {
                setLoading(false);
                setError("Error while registering");
            });
           
    };
    return (
        <>
            <div className="register-wrapper">
                <div className="row g-0">
                    <div className="col-md-4 left-wrapper">
                        
                    </div>
                    <div className="col-md-8 p-3 right-wrapper">
                        <form className="register-form" onSubmit={handleSubmit}>
                            {error && (
                                <div
                                    className="alert alert-danger"
                                    role="alert"
                                >
                                    {error}
                                </div>
                            )}
                            {success && (
                                <div
                                    className="alert alert-primary"
                                    role="alert"
                                >
                                    {success}
                                </div>
                            )}
                            <div >
                            <h2 className="mb-1" >New Organization Registration</h2>
                            <hr/>

                            <div className="mb-3">
                                <label className="form-label"><font color="black">Name</font></label>
                                <input
                                    type="text"
                                    onChange={handleChange}
                                    value={formData.name.value}
                                    name="name"
                                    placeholder="Enter name of the organization"
                                    className={`form-control ${
                                        formData.name.error
                                            ? "is-invalid"
                                            : ""
                                    }`}
                                />
                                {formData.name.error && (
                                    <div className="invalid-feedback">
                                        {formData.name.error}
                                    </div>
                                )}
                            </div>
                            <div className="mb-3">
                                <label className="form-label"><font color="black">Address</font></label>
                                <input
                                    onChange={handleChange}
                                    value={formData.addr.value}
                                    type="text"
                                    placeholder="Enter address"
                                    name="addr"
                                    className={`form-control ${
                                        formData.addr.error
                                            ? "is-invalid"
                                            : ""
                                    }`}
                                />
                                {formData.addr.error && (
                                    <div className="invalid-feedback">
                                        {formData.addr.error}
                                    </div>
                                )}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">
                                <font color="">
                                    Email address
                                    </font>
                                </label>
                                <input
                                    onChange={handleChange}
                                    value={formData.email.value}
                                    placeholder="Enter email address"
                                    type="email"
                                    className={`form-control ${
                                        formData.email.error ? "is-invalid" : ""
                                    }`}
                                    name="email"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                />
                                {formData.email.error && (
                                    <div className="invalid-feedback">
                                        {formData.email.error}
                                    </div>
                                )}
                            </div>
                            <div className="mb-3">
                                <label className="form-label"><font color="">Mobile No.</font></label>
                                <div className="input-group">
                                    <span className="input-group-text">
                                        +91
                                    </span>
                                    <input
                                        onChange={handleChange}
                                        value={formData.con.value}
                                        name="con"
                                        placeholder="Enter mobile number"
                                        type="text"
                                        className={`form-control ${
                                            formData.con.error
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                    />
                                    {formData.con.error && (
                                        <div className="invalid-feedback">
                                            {formData.con.error}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label"><font color="">Type</font>
                                </label>
                                {/* <Dropdown onSelect={handleDropdownChange}>
                                    <Dropdown.Toggle variant="dark" id="dropdown-basic">
                                        { selectedValue || 'Select type'}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item e1="Hospital">Hospital</Dropdown.Item>
                                         <Dropdown.Item e1="Nursing Home">Nursing Home</Dropdown.Item>
                                        <Dropdown.Item e1="Diagonostic Centre">Diagonostic Centre</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown> */}
                                    <input
                                        onChange={handleChange}
                                        value={formData.typ.value}
                                        name="typ"
                                        placeholder="Enter Type"
                                        type="text"
                                        className={`form-control ${
                                            formData.typ.error
                                                ? "is-invalid"
                                                : ""
                                        }`}
                                    />
                                    {formData.typ.error && (
                                        <div className="invalid-feedback">
                                            {formData.typ.error}
                                        </div>
                                    )}
                                    
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={loading}
                            >
                                {loading && (
                                    <div
                                        className="spinner-border spinner-border-sm me-2"
                                        role="status"
                                    >
                                        <span className="visually-hidden">
                                            Loading...
                                        </span>
                                    </div>
                                )}
                                Register
                            </button>
                            </div>
                        </form>
                    </div>
                </div>
                
            </div>
            
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        web3: state.web3Provider,
        orgContract: state.contractReducer,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (user) => {
            dispatch(userAdd(user));
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Register);
