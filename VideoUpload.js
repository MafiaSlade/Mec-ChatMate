import React from 'react';
import { Box, Button } from '@mui/material';

const VideoUpload = ({ onVideoUpload }) => {
  const fileInputRef = React.createRef();

  const handleAttachClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onVideoUpload(file);
    }
  };

  return (
    <Box sx={{ marginTop: 2 }}>
      <input
        type="file"
        accept="video/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <Button variant="contained" color="primary" onClick={handleAttachClick}>
        Attach Video
      </Button>
    </Box>
  );
};

export default VideoUpload;
