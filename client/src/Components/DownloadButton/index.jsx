import React from 'react';
import { Buffer } from 'buffer';

const DownloadButton = ({ base64String, filename, contentType }) => {
  // const extension = {
  //   "image/png":".png",
  //   "image/jpg":".jpg",
  //   "image/jpeg":".jpeg",
  // }
  const handleDownload = () => {
    // Create a blob from the base64 string
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: contentType });

    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;

    // Programmatically click the link to trigger the download
    link.click();
  };

  return (
    <button onClick={handleDownload}>Download Image</button>
  );
};

export default DownloadButton;