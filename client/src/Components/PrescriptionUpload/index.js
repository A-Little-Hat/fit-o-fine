import React, { useState } from 'react';
import axios from 'axios';

const PrescriptionUpload = ({ patientID, togglePrescriptionModal }) => {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };


  // function convertToBase64(file) {
  //   return new Promise((resolve, reject) => {
  //     const fileReader = new FileReader();
  //     fileReader.readAsDataURL(file);
  //     fileReader.onload = () => {
  //       resolve(fileReader.result);
  //       fileReader.onerror = (error) => {
  //         reject(error)
  //       }
  //     }
  //   })
  // }
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!image) {
      alert('Please select an image first!');
      return;
    }

    const formData = new FormData();
    const imgData = image
    // const imgData = await convertToBase64(image)
    formData.append('image', imgData);
    formData.append('patientId', patientID);

    try {
      const res = await axios.post('http://localhost:4000/reportUpload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      res ? alert("uploaded.!! Kindly reload to reflect the changes") : alert('Failed to extract text from image!');
      setImage(null)
      document.getElementById('inputForm').value = ''
      togglePrescriptionModal(event)
    } catch (error) {
      console.error(error);
      alert('Failed to extract text from image!');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input id='inputForm' accept='.png,.jpg,.jpeg' type="file" onChange={handleImageChange} name="image" encType="multipart/form-data" />
        <button type="submit">Upload Prescription</button>
      </form>
      {/* {extractedText && <p>Extracted Text: {extractedText}</p>} */}
    </div>
  );
};

export default PrescriptionUpload;