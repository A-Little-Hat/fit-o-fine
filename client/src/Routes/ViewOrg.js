import { useEffect, useState } from "react";
import { connect } from "react-redux";

import Navbar from "../Components/Navbar";
import { Grid } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";
const Patient = ({ orgContract, web3 }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const org=[];
        (async () => {
            let accounts = await window.ethereum.request({
                method: "eth_accounts",
            });
            try {
                let orgs = await orgContract.contract.methods
                    .getVerifiedOrganization()
                    .call({ form: accounts[0] });
                
                    for(var i=0,j=0;i<orgs.length;i++,j++)
                    {
                        if(orgs[i]['role']==="user")
                        {
                            org.push(orgs[i]['name'],orgs[i]['addr'],orgs[i]['email'],orgs[i]['con'],orgs[i]['typ'])
                        }
                    }
                    console.log(orgs)
                    const organization=[]
                    while(org.length) organization.push(org.splice(0,5))
                    setData(organization);
                    
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        })();

        return () => {};
    }, [orgContract]);
    return (
        <>
            <Navbar />
            <div className="container my-4">

                <div className="card">
                    <div className="card-body">
                        
                        {loading && <p>Loading...</p>}
                        {error && <p>{error}</p>}
                        {data && data.length === 0 && (
                            <p className="m-0">There is no organizations added yet!!</p>
                        )}
                        {data && data.length !== 0 &&  (
                            <>
                            <h3>Organizations Details</h3>
                        <hr/>
                            <center>
                                <Grid
                                    data={data}
                                    columns={[
                                        
                                        "Organization Name",
                                        "Address",
                                        "E-mail",
                                        "Contact No",
                                        "Type",
                                    ]}
                                    search={true}
                                    pagination={{
                                        enabled: true,
                                        limit: 6,
                                    }}
                                />
                                </center>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        orgContract: state.contractReducer,
        web3: state.web3Reducer,
    };
};
export default connect(mapStateToProps)(Patient);
