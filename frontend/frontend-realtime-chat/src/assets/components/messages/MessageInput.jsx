import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import { useState } from 'react';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const MessageInput = ({ onSendMessage }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  const handleFileChange = async (event) => {
    const files = event.target.files;
    console.log('filess', files);
    if (files) {
      //formdata
      const formData = new FormData();
      formData.append('file', files[0]);

      try {
        //peticion al backend
        const response = await fetch('http://localhost:3000/images/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          console.log(
            'data llego correctamente al frontend desde el backend',
            data
          );
        } else {
          console.log('Error al subir la imagennn');
        }
      } catch (error) {
        console.log('Error en la petición de subir imagen', error);
      }
    }
  };

  return (
    <form id="form" onSubmit={handleSubmit}>
      <input
        id="input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        autoComplete="off"
      />
      <button type="submit">Send</button>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        Upload files
        <VisuallyHiddenInput
          type="file"
          onChange={handleFileChange}
          multiple={false}
        />
      </Button>
    </form>
  );
};

export default MessageInput;
