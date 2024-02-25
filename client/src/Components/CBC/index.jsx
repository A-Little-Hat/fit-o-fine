import React from 'react'
import './cbc.css'

const CBC = ({ data }) => {
    return (
        <div>{
            data && data.length!==0 ?
                <>
                    <p>Complete Blood Count</p>
                    <div className='main'>
                        <table>
                            <thead>
                                <tr>
                                    <td>organization_name</td>
                                    <td>patient_id</td>
                                    <td>report_date</td>
                                    <td>test_name</td>
                                    <td>hemoglobin</td>
                                    <td>rbc</td>
                                    <td>hct</td>
                                    <td>mcv</td>
                                    <td>mch</td>
                                    <td>mchc</td>
                                    <td>rdw_cv</td>
                                    <td>tlc</td>
                                    <td>des</td>
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
                                            <td>{e['rbc']}</td>
                                            <td>{e['hct']}</td>
                                            <td>{e['mcv']}</td>
                                            <td>{e['mch']}</td>
                                            <td>{e['mchc']}</td>
                                            <td>{e['rdw_cv']}</td>
                                            <td>{e['tlc']}</td>
                                            <td>{e['des']}</td>
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

export default CBC