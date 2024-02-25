import React from 'react'
import './rbc.css'

const RBC = ({ data }) => {
    return (
        <div>{
            data && data.length!==0  ?
                <>
                    <p>RBC</p>
                    <div className='main'>
                        <table>
                            <thead>
                                <tr>
                                    <td>organization_name</td>
                                    <td>patient_id</td>
                                    <td>report_date</td>
                                    <td>test_name</td>
                                    <td>rbc</td>
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
                                            <td>{e['rbc']}</td>
                                            <td>{e['des']}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </> : <></>}
        </div>
    )
}

export default RBC