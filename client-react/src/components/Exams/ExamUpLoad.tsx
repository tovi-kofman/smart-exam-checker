import { useState, useRef } from 'react';
import Tesseract from 'tesseract.js';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null); 


  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setFile(imageUrl);
      console.log("file uploaded");      
    }
  };

  const openFileExplorer = () => {
    fileInputRef.current.click(); // Trigger the file input click
  };


  return (
    <div>
      <input
        type="file"
        onChange={handleFileChange}
        style={{ display: 'none' }} 
        ref={fileInputRef} 
      />
      <button onClick={openFileExplorer} style={{ padding: '10px', backgroundColor: '#007bff', color: '#fff', borderRadius: '5px' }}>
        Upload File
      </button>
    </div>
  );
};

export default FileUpload;