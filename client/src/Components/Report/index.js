import React,{ useState } from 'react'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useSearchParams } from "react-router-dom";
// import Hemoglobin from './Hemoglobin.jsx';
// import Rbc from './Rbc.jsx';
// import Cbc from './Cbc.jsx';
// import Thyroid from './Thyroid.jsx';


const Report = () => {

    let hemoglobinValue=0
    let rbcValue=0
    let rbc=0
    let hct=0
    let mcv=0
    let mch=0
    let mchc=0
    let rdw_cv=0
    let tlc=0
    let T3=0
    let T4=0
    let tsh=0

    let [searchParams, setSearchParams] = useSearchParams();
    let name = searchParams.get("name")
    let hospitalName = searchParams.get("hospital")
    if(hospitalName==='undefined'){
        hospitalName='Fit-O-Fine'
    }
    let testName = searchParams.get("testName")
    let pid = searchParams.get("pid")
    let date = searchParams.get("date")
    let description = searchParams.get("description")

    if(testName === 'Hemoglobin'){
        hemoglobinValue = searchParams.get("Hemoglobin")
    }
    if(testName === 'RBC'){
        rbcValue = searchParams.get("rbc")
    }
    if(testName === 'CBC'){
        hemoglobinValue=searchParams.get("Hemoglobin")
        rbc=searchParams.get('rbc')
        hct=searchParams.get('hct')
        mcv=searchParams.get('mcv')
        mch=searchParams.get('mch')
        mchc=searchParams.get('mchc')
        rdw_cv=searchParams.get('rdw_cv')
        tlc=searchParams.get('tlc')
    }
    if(testName === 'Thyroid'){
        T3=searchParams.get('T3')
        T4=searchParams.get('T4')
        tsh=searchParams.get('tsh')
    }

    const downloadPDF = () => {
        const capture = document.getElementById("print");
        html2canvas(capture).then((canvas) => {
            const imgData = canvas.toDataURL('img/png');
            const doc = new jsPDF("landscape",'mm','c0');
            const componentWidth = doc.internal.pageSize.getWidth();
            const componentHeight = doc.internal.pageSize.getHeight();
            doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
            doc.save('receipt.pdf');
        })
    }


    return (
        <div align="center">
         <div id="print" align="center" style={{ "height": "100 vh", "display": "flex", "justifyContent": "center", "alignItems": "center" }}>
                    <div className="container" style={{"border":"thick solid #010116","minHeight":"50vh"}}>
                    <div className="row">
                        <div className="md-col-12">
                            <div className="container" id="hosName">Hostpital Name: {hospitalName} </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="md-col-12">
                            <div className="container" id="patientName">patient Name: {name}</div>
                        </div>
                    </div>
                    <hr />
                    <hr />
                    <div className="row">
                        <div className="md-col-12">
                            <div className="container" id="testName">Test Name: {testName} || Date: {date}</div>
                        </div>
                    </div>
                    <hr />
                    <hr />
                    {/* {Hemoglobin} */}
                    {testName&&testName==='Hemoglobin'&&
                    <div className="row">
                    <div className="md-col-4"></div>
                    <div className="md-col-4" id="dataInput">
                        <b>hymoglobin : </b> <span>{hemoglobinValue}</span>
                        <br />
                        <b>Comment : </b> <span>{description}</span>
                    </div>
                    <div className="md-col-4"></div>
                    </div>}
                    {/* {RBC} */}
                    {testName&&testName==='RBC'&&
                    <div className="row">
                    <div className="md-col-4"></div>
                    <div className="md-col-4" id="dataInput">
                        <b>CBC : </b> <span>{rbcValue}</span>
                        <br />
                        <b>Comment : </b> <span>{description}</span>
                    </div>
                    <div className="md-col-4"></div>
                </div>}
                    {testName&&testName==='CBC'&&
                    <div className="row">
                    <div className="md-col-4"></div>
                    <div className="md-col-4" id="dataInput">
                        <p>rbc:{rbc}</p>
                        <p>hct:{hct}</p>
                        <p>mcv:{mcv}</p>
                        <p>mch:{mch}</p>
                        <p>mchc:{mchc}</p>
                        <p>rdw_cv:{rdw_cv}</p>
                        <p>tlc:{tlc}</p>
                        </div>
                    <div className="md-col-4"></div>
                    </div>
                    }
                    {testName&&testName==='Thyroid'&&
                    <div className="row">
                    <div className="md-col-4"></div>
                    <div className="md-col-4" id="dataInput">
                        <p>T3:{T3}</p>
                        <p>T4:{T4}</p>
                        <p>tsh:{tsh}</p>
                    </div>
                    <div className="md-col-4"></div>
                    </div>}
                </div>
            </div>
            <button className="receipt-modal-download-button" onClick={downloadPDF}>Download</button>
        </div>
            )
}

            export default Report