import React, { useState } from 'react'
import axios from "axios";
import './index.css'
import Chatbot from '../../Chatbot'
import chatIcon from './chatbot.gif'

import Hemoglobin from '../../Hemoglobin'
import Thyroid from '../../Thyroid'
import CBC from '../../CBC'
import RBC from '../../RBC'

import ImageTextExtractor from '../../ImageTextExtractor'

const PatientDetails = (props) => {


    const [pdata, setData] = useState([]);
    const [isLoad, setIsLoad] = useState(true)
    const [isChat, setIsChat] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const logout = () => {
        props.setIsAuth(false)
    }

    const toggleModal = (e) => {
        e.preventDefault()
        setIsModalOpen(!isModalOpen)
        document.getElementById('modelDiv').style.display = isModalOpen ?  'none':'block' 
        console.log({ isModalOpen })
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
    }
    if (isLoad) {
        a()
    }

    return (
        <>
            { console.log({"51":isModalOpen}) && isChat ? <Chatbot chatToggle={chatToggle} /> : (
                <React.Fragment>
                    <div className="pNav">
                        <p className="patient-id">{props.pid}</p>
                        <button className="upload-btn" onClick={toggleModal} >Upload Report</button>
                        <button className="logout-btn" onClick={logout}>logout</button>
                    </div>
                    <div id='modelDiv' className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={toggleModal}>&times;</span>
                            <ImageTextExtractor toggleModal={toggleModal} />
                        </div>
                    </div>
                    <div className='container'>
                        <Hemoglobin data={pdata.filter(d => d.test_name === 'Hemoglobin')} />
                        <CBC data={pdata.filter(d => d.test_name === 'CBC')} />
                        <Thyroid data={pdata.filter(d => d.test_name === 'Thyroid')} />
                        <RBC data={pdata.filter(d => d.test_name === 'RBC')} />
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