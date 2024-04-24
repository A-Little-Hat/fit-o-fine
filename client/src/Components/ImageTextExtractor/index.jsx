import React, { useState } from 'react';
import axios from 'axios';

const ImageTextExtractor = ({toggleModal}) => {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!image) {
      alert('Please select an image first!');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);

    try {
      const res=await axios.post('http://localhost:4000/extractTextFromImage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      res ? alert("uploaded.!! Kindly reload to reflect the changes") : alert('Failed to extract text from image!');
      setImage(null)
      document.getElementById('inputForm').value=''
      toggleModal(event)
    } catch (error) {
      console.error(error);
      alert('Failed to extract text from image!');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input id='inputForm' accept='.png,.jpg,.jpeg' type="file" onChange={handleImageChange} name="image" encType="multipart/form-data"/>
        <button type="submit">Upload Report</button>
      </form>
      {/* {extractedText && <p>Extracted Text: {extractedText}</p>} */}
    </div>
  );
};

export default ImageTextExtractor;