import { connect } from "react-redux";
import { Form,Dropdown, Alert } from "react-bootstrap";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const AddPatient=({orgContract,user})=>{
    // const [formData, validator] = useValidate({
        
    //     report_date: { value: "", validate: "required", error: null },
    //     comment: { value: "", validate: "required", error: null },
    // });
    // const handleChange = (e) => {
    //     validator.validOnChange(e.currentTarget);
    // };
    const [patient,setPatient]=useState('');
    const handlePatient=(event)=>
    {
        setPatient(event.target.value)
    };
    const [org,setOrg]=useState('');
    const handleOrg=(e)=>{
       setOrg( e.target.value)
    }
    const [patient_id, setPatientId] = useState('');
    const handlePatientId = (event) => {
        setPatientId(event.target.value);
      };
    const [isValid,setIsValid]=useState(false);
    const [report_date,setReportDate]=useState('');
    const handleReportDateChange=(e)=>
    {
        setReportDate(e.target.value);

    }
    const [comment,setComment]=useState('');
    const handleComment=(e)=>
    {
        setComment(e.target.value);

    }
    const [t3,setT3]=useState('')
    const handleT3=(e)=>{
        setT3(e.target.value)
    }
    const [t4,setT4]=useState('')
    const handleT4=(e)=>{
        setT4(e.target.value)
    }
    const [thysti,setThysti]=useState('');
    const handleThySti=(e)=>{
        setThysti(e.target.value)
    }
      const [rbc1, setRBC1] = useState('');
      const handleRBCchange1=(event)=>{
          setRBC1(event.target.value);
        }
        const [hemoglobin1, setHemoglobin1] = useState('');
        const handleHmgchange1=(event)=>{
            setHemoglobin1(event.target.value);
          }
    const [selectedValue, setSelectedValue] = useState('');
    const handleDropdownChange = (eventKey) => {
              setSelectedValue(eventKey);
    };
      const [hemoglobin, setHemoglobin] = useState('');
      const [rbc, setRBC] = useState('');
      const [hct, setHCT] = useState('');
      const [mcv, setMCV] = useState('');
      const [mch, setMCH] = useState('');
      const [mchc, setMCHC] = useState('');
      const [rdwCV, setRDWCV] = useState('');
      const [tlc, setTLC] = useState('');
        const handleHemoglobinChange = (event) => {
          setHemoglobin(event.target.value);
        };
        const handleRBCchange=(event)=>{
          setRBC(event.target.value);
        }
        const handleHCTchange=(event)=>{
          setHCT(event.target.value);
        }
        const handleMCVchange=(event)=>{
          setMCV(event.target.value);
        }
        const handleMCHchange=(event)=>{
          setMCH(event.target.value);
        }
        const handleMCHCchange=(event)=>{
          setMCHC(event.target.value);
        }
        const handleRDWCVchange=(event)=>{
          setRDWCV(event.target.value);
        }
        const handleTLCchange=(event)=>{
          setTLC(event.target.value);
        }
        const handleFormSubmit=async(e)=>
        {
            e.preventDefault();
            let toastOption = {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            };
            if(selectedValue==='CBC'){
                axios.post('http://localhost:4000/insertcbc',{
                    org_name:user.name,
                    patient_id:patient[org.indexOf(patient_id)]['pid'],
                    report_date:report_date,
                    tname:selectedValue,
                    HEMOGLOBIN:hemoglobin,
                    RBC:rbc,
                    HCT:hct,
                    MCV:mcv,
                    MCH:mch,
                    MCHC:mchc,
                    RDWCV:rdwCV,
                    TLC:tlc,
                    comment:comment
                })
                Alert("added")
            };
        
            if(selectedValue==='RBC'){
                axios.post('http://localhost:4000/insertrbc',{
                    org_name:user.name,
                    patient_id:patient[org.indexOf(patient_id)]['pid'],
                    report_date:report_date,
                    tname:selectedValue,
                    value:rbc1,
                    comment:comment,
                })
                Alert("added")
            };
            if(selectedValue==='Hemoglobin'){
                axios.post('http://localhost:4000/inserthmg',{
                    org_name:user.name,
                    patient_id:patient[org.indexOf(patient_id)]['pid'],
                    report_date:report_date,
                    tname:selectedValue,
                    value:hemoglobin1,
                    comment:comment
                })
                Alert("added")
            }
            if(selectedValue==='Thyroid'){
                axios.post('http://localhost:4000/inserthyroid',{
                    org_name:user.name,
                    patient_id:patient[org.indexOf(patient_id)]['pid'],
                    report_date:report_date,
                    tname:selectedValue,
                    T3:t3,
                    T4:t4,
                    thsh:thysti,
                    comment:comment
                })
                Alert("added")
            }
            
        }
      const handleOnSubmit=async(e) =>
      {
        e.preventDefault();
        let accounts = await window.ethereum.request({
            method: "eth_accounts",
        });
          let patients =  await orgContract.contract.methods
          .getPatients()
          .call({ form: accounts[0] });
          console.log(patients);
         
          const org=[];
          for(let i=0;i<patients.length;i++)
          {
            if(patients[i]['orgname']===user.name)
            {
                org.push(patients[i]['pid']);
                // console.log(typeof(patients[i]['pid']))
            }
          }
          const thispatient=[];
          for(let i=0;i<patients.length;i++)
          {
            if(patients[i]['orgname']===user.name)
            {
                thispatient.push(patients[i]);
                // console.log(typeof(patients[i]['pid']))
            }
          }
        console.log(org)
        setPatient(thispatient);
        setOrg(org)
          const isvalid=org.includes(patient_id)
          console.log(isvalid)
        
          setIsValid(isvalid)

      }

    return (
        <>
        <Navbar/>
        <div className="card-body">
        <center>
        <header>
            <h4>New Patient ? 
        <Link to="/new-patient"> <font size='x'>click here</font></Link>
        </h4>
        </header>
        </center>
        </div>
        <hr/>
        
        <div className="container my-4">
        <h4>Add test to an existing patient</h4>
          
        
            <div className="card -body">
          <div className="card-body">
                <Form onSubmit={handleOnSubmit}>
                    <Form.Group controlId="hemoglobin" >
                        <Form.Label>Patient Id</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Patient Id "
                                value={patient_id}
                                                
                                onChange={handlePatientId}
                                required
                                                
                            />
                    </Form.Group>
            
                    <button type="submit" className="btn btn-sm btn-primary">Check</button>
                </Form>
                </div>
                {isValid?
                <div className="card-body">
                    <h3>Patient Details </h3>
                    <hr/>
                    <form>
                     <div className="row g-3 mb-5">
                            <div className="col-md-6">
                                <label className="form-label"> Patient Name</label>
                                <input
                                    type="text"
                                    value={patient[org.indexOf(patient_id)]['patient_name']}
                                    name="patient_name"
                                    placeholder="Enter Patient name"
                                    className="form-control"
                                    readOnly
                                />
                                
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Address</label>
                                <input
                                    type="text"
                                    
                                    value={patient[org.indexOf(patient_id)]['addr']}
                                    name="addr"
                                    placeholder="Enter Address"
                                    className="form-control"
                                    readOnly
                                />
                                
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Age</label>
                                <input
                                    type="number"
                                    
                                    value={patient[org.indexOf(patient_id)]['age']}
                                    name="age"
                                    placeholder="Enter Age"
                                    className="form-control"
                                    readOnly
                                />
                                
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Contact No</label>
                                <input
                                    type="number"
                                    value={patient[org.indexOf(patient_id)]['mobno']}
                                    name="mobno"
                                    placeholder="Enter mobile no"
                                    className="form-control"
                                    readOnly
                                />
                                
                            </div>

                            {/* //for email */}
                            <div className="col-md-6">
                                <label className="form-label">E-mail</label>
                                <input
                                    type="email"
                                   
                                    value={patient[org.indexOf(patient_id)]['email']}
                                    name="email"
                                    placeholder="Enter E-mail"
                                    className="form-control "
                                    readOnly
                                />
                                
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Report Date</label>
                                <input
                                    type="date"
                                    value={report_date}
                                    onChange={handleReportDateChange}
                                    name="report_date"
                                    placeholder="Enter Report Date"
                                    className="form-control"
                                    
                                />
                                
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Test Name</label>
                                <Dropdown onSelect={handleDropdownChange}>
                                    <Dropdown.Toggle variant="dark" id="dropdown-basic">
                                        {selectedValue || 'Select a test'}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item eventKey="CBC">Complete Blood Count(CBC)</Dropdown.Item>
                                         <Dropdown.Item eventKey="RBC">Red Blood Count(RBC)</Dropdown.Item>
                                        <Dropdown.Item eventKey="Hemoglobin">Hemoglobin</Dropdown.Item> 
                                        <Dropdown.Item eventKey="Thyroid">Thyroid</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    {selectedValue==="CBC" && (
                                        <div className="container my-4">
                                            <Form>
                                            <Form.Group controlId="hemoglobin" >
                                                <Form.Label>Hemoglobin</Form.Label>
                                                <Form.Control
                                                type="number"
                                                placeholder="Enter value "
                                                value={hemoglobin}
                                                
                                                onChange={handleHemoglobinChange}
                                                
                                                />
                                            </Form.Group>

                                            <Form.Group controlId="rbc">
                                                <Form.Label>RBC</Form.Label>
                                                <Form.Control
                                                type="number"
                                                placeholder="Enter value"
                                                value={rbc}
                                                onChange={handleRBCchange}
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="hct">
                                                <Form.Label>HCT</Form.Label>
                                                <Form.Control
                                                type="number"
                                                placeholder="Enter value"
                                                value={hct}
                                                onChange={handleHCTchange}
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="mcv">
                                                <Form.Label>MCV</Form.Label>
                                                <Form.Control
                                                type="number"
                                                placeholder="Enter value"
                                                value={mcv}
                                                onChange={handleMCVchange}
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="mch">
                                                <Form.Label>MCH</Form.Label>
                                                <Form.Control
                                                type="number"
                                                placeholder="Enter value"
                                                value={mch}
                                                onChange={handleMCHchange}
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="mchc">
                                                <Form.Label>MCHC</Form.Label>
                                                <Form.Control
                                                type="number"
                                                placeholder="Enter value"
                                                value={mchc}
                                                onChange={handleMCHCchange}
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="rdw">
                                                <Form.Label>RDW-CV</Form.Label>
                                                <Form.Control
                                                type="number"
                                                placeholder="Enter value"
                                                value={rdwCV}
                                                onChange={handleRDWCVchange}
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="tlc">
                                                <Form.Label>Total Leucocyte Count</Form.Label>
                                                <Form.Control
                                                type="number"
                                                placeholder="Enter value"
                                                value={tlc}
                                                onChange={handleTLCchange}
                                                />
                                            </Form.Group>
                                            </Form>
                                            </div>
                                    )}

                                    {selectedValue==='RBC' && (
                                            <Form>

                                            <Form.Group controlId="rbc">
                                                <Form.Label>RBC</Form.Label>
                                                <Form.Control
                                                type="number"
                                                placeholder="Enter value"
                                                value={rbc1}
                                                onChange={handleRBCchange1}
                                                />
                                            </Form.Group>
                                            </Form>
                                    )}
                                     {selectedValue==='Hemoglobin' && (
                                            <Form>

                                            <Form.Group controlId="hmg">
                                                <Form.Label>Hemoglobin</Form.Label>
                                                <Form.Control
                                                type="number"
                                                placeholder="Enter value"
                                                value={hemoglobin1}
                                                onChange={handleHmgchange1}
                                                />
                                            </Form.Group>
                                            </Form>
                                    )}
                                    {selectedValue==='Thyroid' && (
                                            <Form>
                                            <Form.Group controlId="t3">
                                                <Form.Label>T3</Form.Label>
                                                <Form.Control
                                                type="number"
                                                placeholder="Enter value"
                                                value={t3}
                                                onChange={handleT3}
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="t4">
                                                <Form.Label>T4</Form.Label>
                                                <Form.Control
                                                type="number"
                                                placeholder="Enter value"
                                                value={t4}
                                                onChange={handleT4}
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="tn">
                                                <Form.Label>Thyroid Stimulating Hormone-Ultra</Form.Label>
                                                <Form.Control
                                                type="text"
                                                placeholder="Enter value"
                                                value={thysti}
                                                onChange={handleThySti}
                                                />
                                            </Form.Group>
                                            
                                            </Form>
                                    )}
                            </div>
                            
                            
                    </div>
                    <div>
                    
                <label className="form-label">Comment</label>
                <textarea
                    defaultValue={comment}
                    onChange={handleComment}
                    name="description"
                    placeholder="Enter comment"
                    className="form-control"
                    rows="3"
                    required
                ></textarea>
            </div>
                    
                    <button className="btn btn-sm btn-primary" type="submit" onClick={handleFormSubmit}>Submit</button>
                            </form>
                            
                </div>
                        :
                        <center>
                        <h4>Patient is not available.</h4>
                        </center>
            }

            </div>

        </div>
        
        </>
    );

};


const mapStateToProps = (state) => {
    return {
        orgContract: state.contractReducer,
        web3: state.web3Reducer,
        user: state.userReducer,
    };
};

export default connect(mapStateToProps)(AddPatient);