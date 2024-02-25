import {  useState, useEffect } from "react";
import { connect } from "react-redux";
import Navbar from "../Components/Navbar";
// import { Grid } from "gridjs-react";
// import { html } from "gridjs";
// import "gridjs/dist/theme/mermaid.css";
import { Dropdown } from "react-bootstrap";

import Hemoglobin from "../Components/Hemoglobin";
import RBC from '../Components/RBC'
import CBC from '../Components/CBC'
import Thyroid from '../Components/Thyroid'


// import moment from "moment";
import axios from "axios";
const PatientRecord = ({ orgContract, web3, onSuccess = null ,user}) => {

  const [patient_id, setPatientId] = useState('');
  const handlePatientIdChange = (d) => {
      setPatientId(d.target.value);
    };

    const [selectedValue, setSelectedValue] = useState('');
    const handleDropdownChange = (eventKey) => {
        setSelectedValue(eventKey);
      };
    const [report_date, setReportDate] = useState('');
    const [report_date1, setReportDate1] = useState('');
    const handleReportDateChange = (d) => {
        setReportDate(d.target.value);
      };
      const handleReportDateChange1 = (d) => {
        setReportDate1(d.target.value);
      };
    const [test_name, setTestName] = useState('');
    const handleTestNameChange = (test) => {
          setTestName(test.target.value);
        };
    const [data, setData] = useState([]);
    useEffect(() => {
      setData([])
    }, [test_name,selectedValue])
    
    // const [dataCBC, setDataCBC] = useState([]);
    // const [dataRBC, setDataRBC] = useState([]);
    // const [dataHemoglobin, setDataHemoglobin] = useState([]);
    // const [dataThyroid, setDataThyroid] = useState([]);

    // const clicked=(e)=>{
    //   e.preventDefault()
    //   handleOnSubmit(e)
    //   handleOnSubmit(e)
    // }
    const handleOnSubmit = async (e) => {
      if(selectedValue!==''){
      e.preventDefault();
      if(selectedValue==='Patient Id & Report Date')
      {
        let fetchdata= await axios.post('http://localhost:4000/searchpatientid&reportdate',{
                pid:patient_id,
                rdate1:report_date,
                rdate2:report_date1,
                org_name:user.name
            })
            setData(fetchdata.data)
      //       console.log(fetchdata.data)
      //       let accounts = await window.ethereum.request({
      //         method: "eth_accounts",
      //     });
      //       let patients =  await orgContract.contract.methods
      //       .getPatients()
      //       .call({ form: accounts[0] });
      //       let recordCBC=[];
      //       let recordRBC=[];
      //       let recordHemoglobin=[];
      //       let recordThyroid=[];
            
            
      //       for(let i=0;i<patients.length;i++)
      //     {
      //       for(let j=0;j<data.length;j++)
      //       {
      //         if(patients[i]['pid']===data[j]['patient_id'])
      //         {
      //           if(data[j]['test_name']==='CBC')
      //           {
      //           recordCBC.push(patients[i]['pid'],patients[i]["patient_name"],patients[i]["age"],patients[i]["addr"],patients[i]['mobno'],  
      //           patients[i]['email'],
      //           data[j]["test_name"],data[j]['report_date'],data[j]['hemoglobin'],data[j]['rbc'],data[j]['hct'],
      //           data[j]['mcv'],data[j]['mch'],data[j]['mchc'],data[j]['rdw_cv'],
      //           data[j]['tlc'],data[j]['des'],
      //           html(`<a href='http://localhost:3000/view?hospital=${user.name}&testName=CBC&name=${patients[i]["patient_name"]}&Hemoglobin=${data[j]['hemoglobin']}&description=${data[j]['des']}&date=${data[j]['report_date']},pid=${patients[i]['pid']}&rbc=${data[j]['rbc']}&hct=${data[j]['hct']}&mcv=${data[j]['mcv']}&mch=${data[j]['mch']}&mchc=${data[j]['mchc']}&rdw_cv=${data[j]['rdw_cv']}&tlc=${data[j]['tlc']}'>View</a>
      //             `)
      //           )
      //           }
          
      //           if(data[j]['test_name']==='RBC')
      //           {

      //             recordRBC.push( patients[i]['pid'],patients[i]["patient_name"],patients[i]["age"],patients[i]["addr"],patients[i]['mobno'],
      //           patients[i]['email'],
      //           data[j]["test_name"],data[j]['report_date'],data[j]['rbc'],data[j]['des'],
      //           html(`<a href='http://localhost:3000/view?hospital=${user.name}&testName=Hemoglobin&name=${patients[i]["patient_name"]}&rbc=${data[j]['rbc']}&description=${data[j]['des']}&date=${data[j]['report_date']},pid=${patients[i]['pid']}'>View</a>
      //             `)
      //             )
                 
      //           }
                
                
      //           if(data[j]['test_name']==='Hemoglobin')
      //           {
                  
      //             recordHemoglobin.push(patients[i]['pid'],patients[i]["patient_name"],patients[i]["age"],patients[i]["addr"],patients[i]['mobno'],
      //             patients[i]['email'],
      //             data[j]["test_name"],data[j]['report_date'],data[j]['hemoglobin'],data[j]['des'],
      //             html(`<a href='http://localhost:3000/view?hospital=${user.name}&testName=Hemoglobin&name=${patients[i]["patient_name"]}&Hemoglobin=${data[j]['hemoglobin']}&description=${data[j]['des']}&date=${data[j]['report_date']},pid=${patients[i]['pid']}'>View</a>
      //             `)
      //             )
      //           }
      //           if(data[j]['test_name']==='Thyroid')
      //           {
                  
      //             recordThyroid.push(patients[i]['pid'],patients[i]["patient_name"],patients[i]["age"],patients[i]["addr"],patients[i]['mobno'],
      //             patients[i]['email'],
      //             data[j]["test_name"],data[j]['report_date'],data[j]['T3'],data[j]['T4'],data[j]['thyroid_stimulating_hormone'],data[j]['des'],
      //             html(`<a href='http://localhost:3000/view?hospital=${user.name}&testName=Thyroid&name=${patients[i]["patient_name"]}&T3=${data[j]['T3']}&T4=${data[j]['T4']}&tsh=${data[j]['thyroid_stimulating_hormone']}&description=${data[j]['des']}&date=${data[j]['report_date']},pid=${patients[i]['pid']}'>View</a>
      //             `)
      //             )
      //           }
          

      //         }

      //       }
      //     }
      // const gridCBC=[];
      // const gridRBC=[];
      // const gridHemoglobin=[];
      // const gridThyroid=[];
      // while(recordCBC.length) gridCBC.push(recordCBC.splice(0,17))
      // while(recordRBC.length) gridRBC.push(recordRBC.splice(0,10))
      // while(recordHemoglobin.length) gridHemoglobin.push(recordHemoglobin.splice(0,10))
      // while(recordThyroid.length) gridThyroid.push(recordThyroid.splice(0,13))
      // setDataCBC(gridCBC)
      // setDataRBC(gridRBC)
      // setDataHemoglobin(gridHemoglobin)
      // setDataThyroid(gridThyroid)
      }

      if(selectedValue==='Patient Id')
      {
        let fetchdata= await axios.post('http://localhost:4000/searchpatientid',{
                pid:patient_id,
                org_name:user.name
            })
            setData(fetchdata.data)
          //   console.log(fetchdata.data)
          //   let accounts = await window.ethereum.request({
          //     method: "eth_accounts",
          // });
          //   let patients =  await orgContract.contract.methods
          //   .getPatients()
          //   .call({ form: accounts[0] });
          //   let recordCBC=[];
          //   let recordRBC=[];
          //   let recordHemoglobin=[];
          //   let recordThyroid=[];
            
            
          //   for(let i=0;i<patients.length;i++)
          // {
          //   for(let j=0;j<data.length;j++)
          //   {
          //     if(patients[i]['pid']===data[j]['patient_id'])
          //     {
          //       if(data[j]['test_name']==='CBC')
          //       {
          //       recordCBC.push(patients[i]['pid'],patients[i]["patient_name"],patients[i]["age"],patients[i]["addr"],patients[i]['mobno'],
          //       patients[i]['email'],
          //       data[j]["test_name"],data[j]['report_date'],data[j]['hemoglobin'],data[j]['rbc'],data[j]['hct'],
          //       data[j]['mcv'],data[j]['mch'],data[j]['mchc'],data[j]['rdw_cv'],
          //       data[j]['tlc'],data[j]['des'],
          //       html(`<a href='http://localhost:3000/view?hospital=${user.name}&testName=CBC&name=${patients[i]["patient_name"]}&Hemoglobin=${data[j]['hemoglobin']}&description=${data[j]['des']}&date=${data[j]['report_date']},pid=${patients[i]['pid']}&rbc=${data[j]['rbc']}&hct=${data[j]['hct']}&mcv=${data[j]['mcv']}&mch=${data[j]['mch']}&mchc=${data[j]['mchc']}&rdw_cv=${data[j]['rdw_cv']}&tlc=${data[j]['tlc']}'>View</a>
          //         `)
          //       )
          //       }
          
          //       if(data[j]['test_name']==='RBC')
          //       {

          //         recordRBC.push( patients[i]['pid'],patients[i]["patient_name"],patients[i]["age"],patients[i]["addr"],patients[i]['mobno'],
          //       patients[i]['email'],
          //       data[j]["test_name"],data[j]['report_date'],data[j]['rbc'],data[j]['des'],
          //       html(`<a href='http://localhost:3000/view?hospital=${user.name}&testName=RBC&name=${patients[i]["patient_name"]}&rbc=${data[j]['rbc']}&description=${data[j]['des']}&date=${data[j]['report_date']},pid=${patients[i]['pid']}'>View</a>
          //         `)
          //         )
                 
          //       }
                
          //       // edit
          //       if(data[j]['test_name']==='Hemoglobin')
          //       {
                  
          //         recordHemoglobin.push(patients[i]['pid'],patients[i]["patient_name"],patients[i]["age"],patients[i]["addr"],patients[i]['mobno'],
          //         patients[i]['email'],
          //         data[j]["test_name"],data[j]['report_date'],data[j]['hemoglobin'],data[j]['des'], 
          //         html(`<a href='http://localhost:3000/view?hospital=${user.name}&testName=Hemoglobin&name=${patients[i]["patient_name"]}&Hemoglobin=${data[j]['hemoglobin']}&description=${data[j]['des']}&date=${data[j]['report_date']},pid=${patients[i]['pid']}'>View</a>
          //         `)
          //         )
                 
          //       }
          //       if(data[j]['test_name']==='Thyroid')
          //       {
                  
          //         recordThyroid.push(patients[i]['pid'],patients[i]["patient_name"],patients[i]["age"],patients[i]["addr"],patients[i]['mobno'],
          //         patients[i]['email'],
          //         data[j]["test_name"],data[j]['report_date'],data[j]['T3'],data[j]['T4'],data[j]['thyroid_stimulating_hormone'],data[j]['des'],
          //         html(`<a href='http://localhost:3000/view?hospital=${user.name}&testName=Thyroid&name=${patients[i]["patient_name"]}&T3=${data[j]['T3']}&T4=${data[j]['T4']}&tsh=${data[j]['thyroid_stimulating_hormone']}&description=${data[j]['des']}&date=${data[j]['report_date']},pid=${patients[i]['pid']}'>View</a>
          //         `)
          //         )
          //       }
          

          //     }

          //   }
          // }
          // const gridCBC=[];
          // const gridRBC=[];
          // const gridHemoglobin=[];
          // const gridThyroid=[];
          // while(recordCBC.length) gridCBC.push(recordCBC.splice(0,18))
          // while(recordRBC.length) gridRBC.push(recordRBC.splice(0,11))
          // while(recordHemoglobin.length) gridHemoglobin.push(recordHemoglobin.splice(0,11))
          // while(recordThyroid.length) gridThyroid.push(recordThyroid.splice(0,14))
          // setDataCBC(gridCBC)
          // setDataRBC(gridRBC)
          // setDataHemoglobin(gridHemoglobin)
          // setDataThyroid(gridThyroid)
      
      }

        if(selectedValue==='Report Date'){
          let fetchdata= await axios.post('http://localhost:4000/insertreportdate',{
                rdate1:report_date,
                rdate2:report_date1,
                org_name:user.name
            })
            
        setData(fetchdata.data)
        
        
        // let accounts = await window.ethereum.request({
        //     method: "eth_accounts",
        // });
        //   let patients =  await orgContract.contract.methods
        //   .getPatients()
        //   .call({ form: accounts[0] });
        //   console.log(patients);
        //   const gcbc=[];
        //   const grbc=[];
        //   const ghmg=[];
        //   const recordThyroid=[];
        //   for(let i=0;i<patients.length;i++)
        //   {
        //     for(let j=0;j<data.length;j++)
        //     {
        //       if(data[j]["organization_name"]===patients[i]["orgname"] && data[j]["patient_id"]===patients[i]["pid"] && data[j]['test_name']==="CBC")
        //       {
        //           gcbc.push(patients[i]['pid'],patients[i]["patient_name"],patients[i]["age"],patients[i]["addr"],patients[i]['mobno'],
        //           patients[i]['email'],
        //           data[j]["test_name"],data[j]['report_date'],data[j]['hemoglobin'],data[j]['rbc'],data[j]['hct'],
        //           data[j]['mcv'],data[j]['mch'],data[j]['mchc'],data[j]['rdw_cv'],
        //           data[j]['tlc'],data[j]['des']
        //           )
                  
        //       }
        //       if(data[j]["organization_name"]===patients[i]["orgname"] && data[j]["patient_id"]===patients[i]["pid"] && data[j]['test_name']==="RBC")
        //       {
        //         grbc.push(patients[i]['pid'],patients[i]["patient_name"],patients[i]["age"],patients[i]["addr"],patients[i]['mobno'],
        //         patients[i]['email'],
        //         data[j]["test_name"],data[j]['report_date'],data[j]['rbc'],data[j]['des']
        //         )
        //       }
        //       if(data[j]["organization_name"]===patients[i]["orgname"] && data[j]["patient_id"]===patients[i]["pid"] && data[j]['test_name']==="Hemoglobin")
        //       {
        //         ghmg.push(patients[i]['pid'],patients[i]["patient_name"],patients[i]["age"],patients[i]["addr"],patients[i]['mobno'],
        //         patients[i]['email'],
        //         data[j]["test_name"],data[j]['report_date'],data[j]['hemoglobin'],data[j]['des']
        //         )
        //       }
        //       if(data[j]["patient_id"]===patients[i]["pid"] && data[j]['test_name']==='Thyroid')
        //         {
                  
        //           recordThyroid.push(patients[i]['pid'],patients[i]["patient_name"],patients[i]["age"],patients[i]["addr"],patients[i]['mobno'],
        //           patients[i]['email'],
        //           data[j]["test_name"],data[j]['report_date'],data[j]['T3'],data[j]['T4'],data[j]['thyroid_stimulating_hormone'],data[j]['des'])
                 
        //         }
        //     }
        //   }
        //   const gridCBC=[];
        //   const gridRBC=[];
        //   const gridHemoglobin=[];
        //   const gridThyroid=[];
        //   while(recordThyroid.length) gridThyroid.push(recordThyroid.splice(0,13))
        //   while(gcbc.length) gridCBC.push(gcbc.splice(0,17))
        //   while(grbc.length) gridRBC.push(grbc.splice(0,10))
        //   while(ghmg.length) gridHemoglobin.push(ghmg.splice(0,10))
      
        //   setDataCBC(gridCBC)
        //   setDataRBC(gridRBC)
        //   setDataHemoglobin(gridHemoglobin)
        //   setDataThyroid(gridThyroid)
      
        
        }//end of report date
        if(selectedValue==='Test Name')
        {
          let fetchdata= await axios.post('http://localhost:4000/inserttestname',{
                tname:test_name.toLowerCase(),
                org_name:user.name
            })
            
        // console.log(fetchdata.data)
        setData(fetchdata.data)
        // let accounts = await window.ethereum.request({
        //     method: "eth_accounts",
        // });
        //   let patients =  await orgContract.contract.methods
        //   .getPatients()
        //   .call({ form: accounts[0] });
        //   console.log(patients)
        //   const gcbc=[];
        //   const grbc=[];
        //   const ghmg=[];
        //   const recordThyroid=[]
        //   for(let i=0;i<patients.length;i++)
        //   {
        //     for(let j=0;j<data.length;j++)
        //     {
        //         if(data[j]["organization_name"]===patients[i]["orgname"] && data[j]["patient_id"]===patients[i]["pid"] && data[j]['test_name']==="CBC")
        //       {
        //           gcbc.push(patients[i]['pid'],patients[i]["patient_name"],patients[i]["age"],patients[i]["addr"],
        //           patients[i]['mobno'],patients[i]['email'],
        //           data[j]["test_name"],data[j]['report_date'],data[j]['hemoglobin'],data[j]['rbc'],data[j]['hct'],
        //           data[j]['mcv'],data[j]['mch'],data[j]['mchc'],data[j]['rdw_cv'],
        //           data[j]['tlc'],data[j]['des']
        //           )
                  
        //       }
        //       if(data[j]["organization_name"]===patients[i]["orgname"] && data[j]["patient_id"]===patients[i]["pid"])
        //       {
        //         if(data[j]['test_name']==="RBC" || data[j]['test_name']==="CBC")
        //         {
        //         grbc.push(patients[i]['pid'],patients[i]["patient_name"],patients[i]["age"],patients[i]["addr"],
        //         patients[i]['mobno'],patients[i]['email'],data[j]["test_name"],data[j]['report_date'],
        //         data[j]['rbc'],data[j]['des']
        //         )
        //         }
        //       }
        //       if(data[j]["organization_name"]===patients[i]["orgname"] && data[j]["patient_id"]===patients[i]["pid"])
        //       {
        //         if(data[j]['test_name']==="Hemoglobin" || data[j]['test_name']==="CBC")
        //         {
        //         ghmg.push(patients[i]['pid'],patients[i]["patient_name"],patients[i]["age"],patients[i]["addr"],
        //         patients[i]['mobno'],patients[i]['email'],
        //         data[j]["test_name"],data[j]['report_date'],data[j]['hemoglobin'],data[j]['des']
        //         )
        //         }
        //       }
        //       if(data[j]["patient_id"]===patients[i]["pid"] && data[j]['test_name']==='Thyroid')
        //         {
                  
        //           recordThyroid.push(patients[i]['pid'],patients[i]["patient_name"],patients[i]["age"],patients[i]["addr"],patients[i]['mobno'],
        //           patients[i]['email'],
        //           data[j]["test_name"],data[j]['report_date'],data[j]['T3'],data[j]['T4'],data[j]['thyroid_stimulating_hormone'],data[j]['des'])
                 
        //         }
              

        //     }

        //   }
        //   console.log(recordThyroid)
        //   const gridCBC=[];
        //   const gridRBC=[];
        //   const gridHemoglobin=[];
        //   const gridThyroid=[];
        //   while(gcbc.length) gridCBC.push(gcbc.splice(0,17))
        //   while(grbc.length) gridRBC.push(grbc.splice(0,10))
        //   while(ghmg.length) gridHemoglobin.push(ghmg.splice(0,10))
        //   while(recordThyroid.length) gridThyroid.push(recordThyroid.splice(0,13))
        //   console.log(gridHemoglobin)
      
        //   if(test_name==='cbc')
        //   {
        //   setDataCBC(gridCBC)

        //   }
        //   else if(test_name==='rbc')
        //   {
        //   setDataRBC(gridRBC)
        //   }
        //   else if(test_name.toUpperCase()==='HEMOGLOBIN')
        //   {
        //     setDataHemoglobin(gridHemoglobin)
        //   }
        //   else if(test_name.toUpperCase()==='THYROID')
        //   {
        //     setDataThyroid(gridThyroid)
        //   }

        }//end of test name

      } // if block
    }// end of handlesubmit
    
    return (
        <>
            <Navbar />
        <form >
            <div className="container my-4">
                <div className="card">
                    <div className="card-body">
                      
                        <h3>Search</h3>
                        
                         <hr/>
                    <Dropdown onSelect={handleDropdownChange} >
                        <Dropdown.Toggle variant="dark" id="dropdown-basic">
                            {selectedValue || 'Search By  '}
                        </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item eventKey="Report Date">Report Date</Dropdown.Item>
                                <Dropdown.Item eventKey="Test Name">Test Name</Dropdown.Item>
                                <Dropdown.Item eventKey="Patient Id">Patient Id</Dropdown.Item>
                                <Dropdown.Item eventKey="Patient Id & Report Date">Patient Id & Report Date</Dropdown.Item>
                            </Dropdown.Menu>
                     </Dropdown>

                     {selectedValue==='Report Date' && (
                        <div className="container my-4">
                             Start Date
                                <input
                                    type="date"
                                    onChange={handleReportDateChange}
                                    value={report_date}
                                    name="report"
                                    placeholder="Enter Start Date"
                                    className="form-control"
                                    required
                                />
                                End Date
                                <input
                                    type="date"
                                    onChange={handleReportDateChange1}
                                    value={report_date1}
                                    name="report"
                                    placeholder="Enter End Date"
                                    className="form-control"
                                    required
                                />
                        </div>
                     )}
                     {selectedValue==='Test Name' &&(
                      <div className="container my-4">
                        <input
                        
                                    type="search"
                                    onChange={handleTestNameChange}
                                    value={test_name}
                                    name="test_name"
                                    placeholder="Enter Test Name"
                                    className="form-control"
                                    required
                                />
                        
                    </div>
                     )}
                     {selectedValue==='Patient Id' &&(
                      <div className="container my-4">
                      <input
                      
                                  type="search"
                                  onChange={handlePatientIdChange}
                                  value={patient_id}
                                  name="patient_id"
                                  placeholder="Enter Patient Id"
                                  className="form-control"
                                  required
                              />
                      
                  </div>
                     )}
                     {selectedValue==='Patient Id & Report Date' &&(
                      <div className="container my-4">
                      <input
                      
                                  type="search"
                                  onChange={handlePatientIdChange}
                                  value={patient_id}
                                  name="patient_id"
                                  placeholder="Enter Patient Id"
                                  className="form-control"
                                  required
                        />
                        <div className="container my-4">
                             Start Date
                                <input
                                    type="date"
                                    onChange={handleReportDateChange}
                                    value={report_date}
                                    name="report"
                                    placeholder="Enter Start Date"
                                    className="form-control"
                                    required
                                />
                                End Date
                                <input
                                    type="date"
                                    onChange={handleReportDateChange1}
                                    value={report_date1}
                                    name="report"
                                    placeholder="Enter End Date"
                                    className="form-control"
                                    required
                                />
                        </div>
                      
                  </div>
                     )}
                     

                    </div>
                    
                </div>
                
                  
                <button className="btn btn-lr btn-primary" onClick={handleOnSubmit} >
                Search  
                </button>
          
          
            {data && data.length===0 ?
              <>
                <center>
                  <p className="m-10">Nothing to show</p>
                </center>
              </>:
              <>
                <Hemoglobin data={data.filter(d=>d.test_name==='Hemoglobin')} />
                <CBC data={data.filter(d=>d.test_name==='CBC')}  />
                <Thyroid data={data.filter(d=>d.test_name==='Thyroid')}  />
                <RBC data={data.filter(d=>d.test_name==='RBC')}  />
              </>
            }

            {/* <div className="container my-4">
            
                  
                {dataCBC && dataCBC.length!==0 && (
                <>
                <hr/>
                <h5>CBC</h5>
                <Grid
                
                      data={dataCBC}
                                    columns={[
                                      
                                        "Patient Id",
                                        "Name",
                                        "Age",
                                        "Address",
                                        "Contact No",
                                        "E-mail",
                                        "Test Name",
                                        "Report Date",
                                        "Hemoglobin",
                                        "RBC",
                                        "HCT",
                                        "MCV",
                                        "MCH",
                                        "MCHC",
                                        "RDWCv",
                                        "Total Leucocyte Count",
                                        "Comment",
                                        "View"
                        
                                    ]}
                                    
                                    search={true}
                                    // sort={true}
                                    
                                    pagination={{
                                      enabled: true,
                            
                                      
                                  }}
                                  
                />
                </>
                )}
                
                {dataRBC && dataRBC.length!==0 &&(
                  <>
                  <hr/>
                  <h5>RBC</h5>
                <Grid
                  data={dataRBC}
                  columns={[
                    "Patient Id",
                    "Name",
                    "Age",
                    "Address",
                    "Contact No",
                    "E-mail",
                    "Test Name",
                    "Report Date",
                    "RBC",
                    "Comment",
                    "View"

                  ]}
                  search={true}
                  // sort={true}
                  pagination={{
                    enabled: true,
                }}
                  />
                  </>
                )}

              {dataHemoglobin && dataHemoglobin.length!==0 &&(
                                <>
                                <hr/>
                                <h5>Hemoglobin</h5>
                                
                              <Grid
                                data={dataHemoglobin}
                                columns={[
                                  "Patient Id",
                                  "Name",
                                  "Age",
                                  "Address",
                                  "Contact No",
                                  "E-mail",
                                  "Test Name",
                                  "Report Date",
                                  "Hemoglobin",
                                  "Comment",
                                  "View"

                                ]}
                                search={true}
                                // sort={true}
                                pagination={{
                                  enabled: true,
                          
                              }}
                                />
                                </>
                              )}

                          {dataThyroid && dataThyroid.length!==0 &&(
                                            <>
                                            <hr/>
                                            <h5>Thyroid</h5>
                                          <Grid
                                            data={dataThyroid}
                                            columns={[
                                              "Patient Id",
                                              "Name",
                                              "Age",
                                              "Address",
                                              "Contact No",
                                              "E-mail",
                                              "Test Name",
                                              "Report Date",
                                              "T3",
                                              "T4",
                                              "Thyroid Stimulating Hormone",
                                              "Comment",
                                              "View"

                                            ]}
                                            search={true}
                                            // sort={true}
                                            pagination={{
                                              enabled: true,
                                          }}
                                            />
                                            </>
                                          )}
                         
                        </div>*/}

            </div> 
            
            </form>
            
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        orgContract: state.contractReducer,
        web3: state.web3Reducer,
        user: state.userReducer
    };
};
export default connect(mapStateToProps)(PatientRecord);