import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Navbar from "../Components/Navbar";
import { Grid} from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";
import { h } from "gridjs";
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
            //<connection/>
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
                        let message =
                            data.events.VerifyOrganization.returnValues._message;
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
                <div className="card" >
                    <div className="card-body" style={{backgroundColor:'#E5E3E3'}}>
                        <h5 className="card-title">New Organization Request</h5>
                        <hr />
                        {loading && <p>Loading...</p>}
                        {error && <p>{error}</p>}
                        {data && data.length !== 0 ? (
                            <Grid
                                data={data}
                                columns={[
                                    {
                                        data: (row) => row.name,
                                        name: "Name",
                                    },
                                    {
                                        data: (row) => row.addr,
                                        name: "Address",
                                    },
                                    {
                                        data: (row) => row.email,
                                        name: "Email Address",
                                    },
                                    {
                                        data: (row) => row.con,
                                        name: "Contact Number",
                                    },
                                    {
                                        data:(row)=>row.typ,
                                        name:"Type",
                                    },
                                    {
                                        data: (row) => row.id,
                                        name: "Actions",
                                        formatter: (data) => {
                                            return h(
                                                "button",
                                                {
                                                    className:
                                                        "border rounded-md text-white btn btn-primary",
                                                    onClick: () =>
                                                        approvedOrg(data),
                                            

                                                },
                                                "Approve"
                                            );
                                        },
                                    },
                                ]}
                                search={false}
                                pagination={{
                                    enabled: true,
                                    limit: 5,
                                }}
                            />
                        ) : (
                            <p className="text-center">
                                There is no unverified organization
                            </p>
                        )}
                    </div>
                </div>
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
