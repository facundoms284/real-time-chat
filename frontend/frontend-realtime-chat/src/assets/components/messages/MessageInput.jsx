import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState } from 'react';
import { uploadImage } from '../../../api/images';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  width: 1,
});

const MessageInput = ({ onSendMessage, currentSocketId }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  const handleUploadImage = (e) => {
    uploadImage(e, currentSocketId);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl flex items-center bg-gray-300 bg-opacity-50 p-3 rounded-lg shadow-lg gap-2 fixed bottom-2"
    >
      <input
        className="flex-grow border border-gray-400 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        autoComplete="off"
        placeholder="Type your message..."
      />
      <button
        type="submit"
        className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition duration-200"
      >
        Send
      </button>
      <Button
        component="label"
        className="ml-2"
        variant="contained"
        startIcon={<CloudUploadIcon />}
      >
        Upload
        <VisuallyHiddenInput
          type="file"
          onChange={handleUploadImage}
          multiple={false}
        />
      </Button>
    </form>
  );
};

export default MessageInput;
