import React from 'react'
import './thyroid.css'

const Thyroid = ({ data }) => {
    return (
        <div>
            {
                data && data.length!==0 ?
                    <>
                        <p>Thyroid</p>
                        <div className='main'>
                            <table>
                                <thead>
                                    <tr>
                                        <td>organization_name</td>
                                        <td>patient_id</td>
                                        <td>report_date</td>
                                        <td>test_name</td>
                                        <td>T3</td>
                                        <td>T4</td>
                                        <td>thyroid_stimulating_hormone</td>
                                        <td>des</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((e, index) => (
                                            <tr key={index}>
                                                <td>{e['organization_name']}</td>
                                                <td>{e['patient_id']}</td>
                                                <td>{e['report_date']}</td>
                                                <td>{e['test_name']}</td>
                                                <td>{e['T3']}</td>
                                                <td>{e['T4']}</td>
                                                <td>{e['thyroid_stimulating_hormone']}</td>
                                                <td>{e['des']}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </>
                    :<></>
            }
        </div>
    )
}

export default Thyroid