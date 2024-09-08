import React from 'react'
import './hemoglobin.css'

const Hemoglobin = ({ data }) => {
    const view=(e,index)=>{
        e.preventDefault()
        window.open(`http://localhost:3000/view?organization_name=${data[index]['organization_name']},patient_id=${data[index]['patient_id']},report_date=${data[index]['report_date']},test_name=${data[index]['test_name']},hemoglobin=${data[index]['hemoglobin']},des=${data[index]['des']},`)
    }
    return (
        <div>{
            data && data.length!==0  ?
                <>
                    <p>Hemoglobin</p>
                    <div className='main'>
                        <table>
                            <thead>
                                <tr>
                                    <td>organization_name</td>
                                    <td>patient_id</td>
                                    <td>report_date</td>
                                    <td>test_name</td>
                                    <td>hemoglobin</td>
                                    <td>des</td>
                                    {/* <td>View Report</td> */}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data && data.map((e, index) => (
                                        <tr key={index}>
                                            <td>{e['organization_name']}</td>
                                            <td>{e['patient_id']}</td>
                                            <td>{e['report_date']}</td>
                                            <td>{e['test_name']}</td>
                                            <td>{e['hemoglobin']}</td>
                                            <td>{e['des']}</td>
                                            {/* <td><button onClick={(e) => view(e,index)}>View</button></td> */}
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </> : <></>
                }
        </div>
    )
}

export default Hemoglobin