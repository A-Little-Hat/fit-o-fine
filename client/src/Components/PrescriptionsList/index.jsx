import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DownloadButton from '../DownloadButton';

const PrescriptionsList = ({ patientId }) => {
  const [prescriptions, setPrescriptions] = useState();

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/getPrescription/${patientId}`);
        setPrescriptions(response.data.response);
        console.log({prescriptions})
      } catch (error) {
        console.error('Error fetching prescriptions:', error);
      }
    };
    fetchPrescriptions();
  }, [patientId]);
  

  

  return (
    <div>
      {prescriptions && prescriptions.length > 0 ?
      <>
      <h2>Prescriptions</h2>
      <table  >
        <thead style={{backgroundColor:"skyblue",padding:"10px"}}>
          <tr>
            <td>FileName</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody style={{padding:"10px"}}>
        {prescriptions.map((prescription, index) => (
          <tr key={index}>
            <td>
              {prescription.filename}
            </td>
            <td>
              <DownloadButton base64String={prescription.data} filename={prescription.filename} contentType={prescription.contentType} />
            </td>
          </tr>
        ))}

        </tbody>
      </table>
      </> : <></>
      }
    </div>
  );
};

export default PrescriptionsList;
