import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Navbar from "../Components/Navbar";
import { ToastContainer, toast } from "react-toastify";
const Request = ({ contract, web3 }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        (async () => {
            let accounts = await window.ethereum.request({
                method: "eth_accounts",
            });
            let orgs = await contract.contract.methods
                .getUnverifiedOrganization()
                .call({ from: accounts[0] })
                .catch((err) => {
                    setError(err);
                });
            setData(orgs);
            setLoading(false);
        })();
    }, [contract]);

    const approvedOrg = async (address) => {
        let toastOption = {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        };
        if (!web3.web3.utils.isAddress(address)) {
            toast.error("Invalid address error", toastOption);
            return;
        }
        let accounts = await window.ethereum.request({
            method: "eth_accounts",
        });
        await toast.promise(
            contract.contract.methods
                .verifyOrganization(address)
                .send({ from: accounts[0] }),

            {
                pending: "Waiting...",
                success: {
                    render({ data }) {
                        let message = data.events.VerifyOrganization.returnValues._message;
                        setData((state) =>
                            state.filter((item) => item.id !== address)
                        );
                        return message;
                    },
                },
                error: {
                    render({ err }) {
                        return "Error : " + err.message;
                    },
                },
            }
        );

    };
    const rejectOrg = async (address) => {
        let toastOption = {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        };
        if (!web3.web3.utils.isAddress(address)) {
            toast.error("Invalid address error", toastOption);
            return;
        }
        let accounts = await window.ethereum.request({
            method: "eth_accounts",
        });
        await toast.promise(
            contract.contract.methods
                .rejectOrganization(address)
                .send({ from: accounts[0] }),
            {
                pending: "Waiting...",
                success: {
                    render({ data }) {
                        let message = data.events.VerifyOrganization.returnValues._message;
                        setData((state) =>
                            state.filter((item) => item.id !== address)
                        );
                        return message;
                    },
                },
                error: {
                    render({ err }) {
                        return "Error : " + err.message;
                    },
                },
            }
        );

    };
    return (
        <>
            <Navbar />

            <div className="container my-5"  >
                <h5 className="card-title">New Organization Request</h5>
                <hr />
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}

                {data && data.length !== 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <td
                                    style={{"paddingTop":"20px", "paddingBottom":"20px", "paddingLeft":"20px"}}
                                >Name</td>
                                <td
                                    style={{"paddingTop":"20px", "paddingBottom":"20px"}}
                                >Address</td>
                                <td
                                    style={{"paddingTop":"20px", "paddingBottom":"20px"}}
                                >Email Address</td>
                                <td
                                    style={{"paddingTop":"20px", "paddingBottom":"20px"}}
                                >Contact Number</td>
                                <td
                                    style={{"paddingTop":"20px", "paddingBottom":"20px"}}
                                >Type</td>
                                <td
                                    style={{"paddingTop":"20px", "paddingBottom":"20px"}}
                                >Actions</td>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) =>
                            (
                                <tr key={index} >
                                    <td
                                        style={{"paddingTop":"20px", "paddingBottom":"20px", "paddingLeft":"20px"}}
                                    >{item['name']}</td>
                                    <td
                                        style={{"paddingTop":"20px", "paddingBottom":"20px"}}
                                    >{item['addr']}</td>
                                    <td
                                        style={{"paddingTop":"20px", "paddingBottom":"20px"}}
                                    >{item['email']}</td>
                                    <td
                                        style={{"paddingTop":"20px", "paddingBottom":"20px"}}
                                    >{item['con']}</td>
                                    <td
                                        style={{"paddingTop":"20px", "paddingBottom":"20px"}}
                                    >{item['typ']}</td>
                                    <td
                                        style={{"paddingTop":"20px", "paddingBottom":"20px"}}
                                    >
                                        <button onClick={() =>
                                            approvedOrg(item['id'])}
                                            style={{"marginRight":"20px"}}
                                            >
                                            Approve
                                        </button>
                                        <button onClick={() =>
                                            rejectOrg(item['id'])}>
                                            Reject
                                        </button>
                                    </td>
                                </tr>
                            )
                            )
                            }
                        </tbody>
                    </table>
                ) : (
                    <p className="text-center">
                        There is no unverified organization
                    </p>
                )}
            </div>

            <ToastContainer />
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        contract: state.contractReducer,
        web3: state.web3Reducer,
    };
};
export default connect(mapStateToProps)(Request);
