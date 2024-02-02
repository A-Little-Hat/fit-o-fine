import { useEffect,  useState } from "react";
import { connect } from "react-redux";

import Navbar from "../Components/Navbar";
import { Grid } from "gridjs-react";
import "gridjs/dist/theme/mermaid.css";
import moment from "moment";
import axios from "axios";
const Patient = ({ orgContract, web3 ,user}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        

        (async () => {
            let accounts = await window.ethereum.request({
                method: "eth_accounts",
            });
            try {
                const allorg=await axios.post('http://localhost:4000/getallorg',{
                 org_name:user.name

        })
        console.log(allorg.data)
                const x=[];
                let patients = await orgContract.contract.methods
                    .getPatients()
                    .call({ form: accounts[0] });
                    
               
                for(var i=0;i<patients.length;i++)
                {
                    for(var j=0;j<allorg.data.length;j++){
                    if(patients[i]['orgname']===user.name && patients[i]['pid']===allorg.data[j]['patient_id']){
                    x.push(patients[i]['pid'],patients[i]['patient_name']
                    ,patients[i]['addr']
                    ,patients[i]['age'],
                    patients[i]['mobno'],
                    patients[i]['email'],
                    moment.unix(patients[i]['report_date']/1000).format('DD/MM/YYYY'),
                     allorg.data[j]['test_name'],
                    patients[i]['description'],
                    )
                    }
                }

                }
                const y=[];
                while(x.length) y.push(x.splice(0,9))

                    console.log(y)
                    setData(y);
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
                            <p className="m-0">There is no patient added yet!!</p>
                        )}
                        {data && data.length !== 0 && (
                            <>
                            <h3>Patient Details</h3>
                        <hr/>
                            <center>
                                <Grid
                                    data={data}
                                    columns={[
                                        "Id",
                                        "Patient Name",
                                        "Address",
                                        "Age",
                                        "Contact No",
                                        "E-mail",
                                        "Report Date",
                                        "Test name",
                                        "Description",
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
        user:state.userReducer
    };
};
export default connect(mapStateToProps)(Patient);
