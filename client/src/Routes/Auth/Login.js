import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { setWeb3 } from "../../store/thunk/setWeb3";
import metamasklogo from "../../Assets/MetaMask.png";
import orgArtifact from "../../artifact/Org.json";
function Login({ setWeb3, web3 }) {
    let location = useLocation();
    let navigate = useNavigate();
    const handleLogin = () => {
        setWeb3();
    };
    useEffect(() => {
        (() => {
            let { from } = location.state || {
                from: { pathname: "/profile" },
            };
            if (web3.loading === false && web3.web3 !== null) {
                navigate(from.pathname);
            }
        })();
    }, [web3, location, navigate]);
    return (
        <div >
        <div className="container login-container py-5"  >
            <div className="card-wrapper" style={{backgroundColor:'#EDF4F5'}}>
                <h4 className="text-center m-5"><font color="black">
                    Connect your Ethereum wallet to <b>Balance Manager</b></font>
                </h4>
                <div className="metamask-wrapper m-5" style={{backgroundColor:'#C8CACA'}} >
                    <div className="left-image-wrapper">
                        <img src={metamasklogo} alt="meta mask" />
                    </div>
                    <div className="right-buttons-wrapper">
                        <button className="btn btn-mm " onClick={handleLogin}>
                            Connect to MetaMask
                        </button>
                        <p className="text-muted" color="#575757">Chrome, FireFox, Brave</p>
                    </div>
                </div>
                <p className="text-muted m-5">
                    Confused by these options?{" "}
                    <Link to="/learn-more">Learn more</Link>
                </p>
            </div>
            <br/>
            
            <br/>
            <br/>
            <br/>
        </div>
        </div>
    );
}

const matchStateToProps = (state) => {
    return {
        web3: state.web3Reducer,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setWeb3: () =>
            dispatch(
                setWeb3(
                    orgArtifact.abi,
                    orgArtifact.networks[5777].address
                )
            ),
    };
};
export default connect(matchStateToProps, mapDispatchToProps)(Login);
