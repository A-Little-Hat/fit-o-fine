import React, { useState } from 'react'
import axios from "axios";
import './index.css'
import Chatbot from '../../Chatbot'
import chatIcon from './chatbot.gif'

import Hemoglobin from '../../Hemoglobin'
import Thyroid from '../../Thyroid'
import CBC from '../../CBC'
import RBC from '../../RBC'

const PatientDetails = (props) => {


    const [pdata, setData] = useState([]);
    const [isLoad, setIsLoad] = useState(true)
    // const [dataCBC, setDataCBC] = useState([]);
    // const [dataRBC, setDataRBC] = useState([]);
    // const [dataHemoglobin, setDataHemoglobin] = useState([]);
    // const [dataThyroid, setDataThyroid] = useState([]);
    const [isChat, setIsChat] = useState(false)


    const logout = () => {
        props.setIsAuth(false)
    }
    const chatToggle = (e) => {
        e.preventDefault()
        setIsChat(!isChat)
        console.log(isChat)
    }


    const a = async () => {
        const response = await axios.post('http://localhost:4000/getPatientData', { pid: props.pid })
        setData(response.data)
        setIsLoad(false)
        //     if (pdata && pdata != []) {
        //         setIsLoad(false)
        //         for (var j = 0; j < pdata.length; j++) {
        //             if (pdata[j]['test_name'] === 'CBC') {
        //                 recordCBC.push(
        //                     pdata[j]["test_name"], pdata[j]['report_date'], pdata[j]['hemoglobin'], pdata[j]['rbc'], pdata[j]['hct'],
        //                     pdata[j]['mcv'], pdata[j]['mch'], pdata[j]['mchc'], pdata[j]['rdw_cv'],
        //                     pdata[j]['tlc'], pdata[j]['des'],
        //                     html(`<a href='http://localhost:3000/view?hospital=${props.pid.split('#')[1]}&testName=CBC&name=${props.pid.split('#')[0]}&Hemoglobin=${pdata[j]['hemoglobin']}&description=${pdata[j]['des']}&date=${pdata[j]['report_date']},pid=${props.pid}&rbc=${pdata[j]['rbc']}&hct=${pdata[j]['hct']}&mcv=${pdata[j]['mcv']}&mch=${pdata[j]['mch']}&mchc=${pdata[j]['mchc']}&rdw_cv=${pdata[j]['rdw_cv']}&tlc=${pdata[j]['tlc']}'>View</a>
        //               `)
        //               )
        //             }

        //             if (pdata[j]['test_name'] === 'RBC') {

        //                 recordRBC.push(
        //                     pdata[j]["test_name"], pdata[j]['report_date'], pdata[j]['rbc'], pdata[j]['des'],
        //                     html(`<a href='http://localhost:3000/view?hospital=${props.pid.split('#')[1]}&testName=RBC&name=${props.pid.split('#')[0]}&rbc=${pdata[j]['rbc']}&description=${pdata[j]['des']}&date=${pdata[j]['report_date']},pid=${props.pid}'>View</a>
        //               `)
        //                 )

        //             }

        //             // edit
        //             if (pdata[j]['test_name'] === 'Hemoglobin') {

        //                 recordHemoglobin.push(
        //                     pdata[j]["test_name"], pdata[j]['report_date'], pdata[j]['hemoglobin'], pdata[j]['des'],
        //                     html(`<a href='http://localhost:3000/view?hospital=${props.pid.split('#')[1]}&testName=Hemoglobin&name=${props.pid.split('#')[0]}&Hemoglobin=${pdata[j]['hemoglobin']}&description=${pdata[j]['des']}&date=${pdata[j]['report_date']},pid=${props.pid}'>View</a>
        //               `)
        //                 )

        //             }
        //             if (pdata[j]['test_name'] === 'Thyroid') {

        //                 recordThyroid.push(
        //                     pdata[j]["test_name"], pdata[j]['report_date'], pdata[j]['T3'], pdata[j]['T4'], pdata[j]['thyroid_stimulating_hormone'], pdata[j]['des'],
        //                     html(`<a href='http://localhost:3000/view?hospital=${props.pid.split('#')[1]}&testName=Thyroid&name=${props.pid.split('#')[0]}&T3=${pdata[j]['T3']}&T4=${pdata[j]['T4']}&tsh=${pdata[j]['thyroid_stimulating_hormone']}&description=${pdata[j]['des']}&date=${pdata[j]['report_date']},pid=${props.pid}'  target="_blank" >View</a>
        //                     `)
        //                 )
        //             }


        //         }


        //         while (recordCBC.length) gridCBC.push(recordCBC.splice(0, 12))
        //         while (recordRBC.length) gridRBC.push(recordRBC.splice(0, 5))
        //         while (recordHemoglobin.length) gridHemoglobin.push(recordHemoglobin.splice(0, 5))
        //         while (recordThyroid.length) gridThyroid.push(recordThyroid.splice(0, 8))
        //         setDataCBC(gridCBC)
        //         setDataRBC(gridRBC)
        //         setDataHemoglobin(gridHemoglobin)
        //         setDataThyroid(gridThyroid)
        //     }
        //     console.log(pdata)
        }
        if (isLoad) {
            a()
        }
        // let recordCBC = [];
        // let recordRBC = [];
        // let recordHemoglobin = [];
        // let recordThyroid = [];

        // const gridCBC = [];
        // const gridRBC = [];
        // const gridHemoglobin = [];
        // const gridThyroid = [];


        return (
            <>
                {isChat ? <Chatbot chatToggle={chatToggle} /> : (
                    <React.Fragment>
                        <div className="pNav nav nav-fill nav-pills">
                            <p className="nav-item">{props.pid}</p>
                            <button className="nav-item" onClick={logout}>logout</button>
                        </div>

                        {/* {!isLoad && pdata && pdata.length === 0 && (
                <>
                    <center>
                        <p className="m-10">No Records Found</p>
                    </center>
                </>
            )
            }
            <div className="container my-4">


                {dataCBC && dataCBC.length !== 0 && (
                    <>
                        <hr />
                        <h5>CBC</h5>
                        <Grid

                            data={dataCBC}
                            columns={[


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
                                "view"

                            ]}

                            search={true}
                            // sort={true}

                            pagination={{
                                enabled: true,


                            }}

                        />
                    </>
                )}

                {dataRBC && dataRBC.length !== 0 && (
                    <>
                        <hr />
                        <h5>RBC</h5>
                        <Grid
                            data={dataRBC}
                            columns={[

                                "Test Name",
                                "Report Date",
                                "RBC",
                                "Comment",
                                "view"

                            ]}
                            search={true}
                            // sort={true}
                            pagination={{
                                enabled: true,
                            }}
                        />
                    </>
                )}

                {dataHemoglobin && dataHemoglobin.length !== 0 && (
                    <>
                        <hr />
                        <h5>Hemoglobin</h5>

                        <Grid
                            data={dataHemoglobin}
                            columns={[

                                "Test Name",
                                "Report Date",
                                "Hemoglobin",
                                "Comment",
                                "view"

                            ]}
                            search={true}
                            // sort={true}
                            pagination={{
                                enabled: true,

                            }}
                        />
                    </>
                )}

                {dataThyroid && dataThyroid.length !== 0 && (
                    <>
                        <hr />
                        <h5>Thyroid</h5>
                        <Grid
                            data={dataThyroid}
                            columns={[

                                "Test Name",
                                "Report Date",
                                "T3",
                                "T4",
                                "Thyroid Stimulating Hormone",
                                "Comment",
                                "view"

                            ]}
                            search={true}
                            // sort={true}
                            pagination={{
                                enabled: true,
                            }}
                        />
                    </>
                )}

            </div> */}
            <div className='container'>
                <Hemoglobin data={pdata.filter(d=>d.test_name==='Hemoglobin')} />
                <CBC data={pdata.filter(d=>d.test_name==='CBC')}  />
                <Thyroid data={pdata.filter(d=>d.test_name==='Thyroid')}  />
                <RBC data={pdata.filter(d=>d.test_name==='RBC')}  />
              </div>
                        <button className='chatButtonOn' onClick={chatToggle}>
                            <img src={chatIcon} alt="Chat Button" />
                        </button>
                    </React.Fragment>
                )}
            </>
        )
    }

    export default PatientDetails