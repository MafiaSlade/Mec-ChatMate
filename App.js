// src/App.js
import React, { useEffect, useState, useRef } from 'react';
import { Container, Typography, TextField, Button, IconButton, Link, Box, Modal } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import InfoIcon from '@mui/icons-material/Info';
import VideoUpload from './VideoUpload';
import VideoList from './VideoList';
import SignInForm from './SignInForm';
import { getChatbotResponse } from './responses'; // Importing the responses
import VoiceAssistant from './VoiceAssistant';
import './index.css';

const App = () => {
  const [userInput, setUserInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [showSignInForm, setShowSignInForm] = useState(false);
  const [signInSuccess, setSignInSuccess] = useState(false); // Track sign-in success
  const [showVideoModal, setShowVideoModal] = useState(false); // State to control video modal
  const [currentVideo, setCurrentVideo] = useState(null); // State to store current video
  const chatbox = useRef(null);

  useEffect(() => {
    if (chatbox.current) {
      chatbox.current.scrollTop = chatbox.current.scrollHeight;
    }
  }, [chatMessages]);

  const sendMessage = () => {
    if (userInput.trim() === '') return;

    const newMessage = { text: userInput, sender: 'user' };
    setChatMessages((prevMessages) => [...prevMessages, newMessage]);
    setUserInput('');

    setTimeout(() => {
      const botResponse = getChatbotResponse(userInput);

      if (userInput.toLowerCase().includes('events ')) {
        if (!signInSuccess) {
          setShowSignInForm(true);
        } else {
          const eventResponse = getChatbotResponse('events access granted');
          const newMessage = { text: eventResponse, sender: 'bot' };
          setChatMessages((prevMessages) => [...prevMessages, newMessage]);

          if (videos.length > 0) {
            const videoListMessage = (
              <div>
                <Typography variant="body1">Here are your uploaded videos:</Typography>
                <VideoList videos={videos} onVideoClick={handleVideoClick} />
              </div>
            );
            const newMessage = { text: videoListMessage, sender: 'bot' };
            setChatMessages((prevMessages) => [...prevMessages, newMessage]);
          }
        }
      } else {
        const newMessage = { text: botResponse, sender: 'bot' };
        setChatMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    }, 300);
  };

  const handleInfoClick = () => {
    const contactMessage = (
      <Typography variant="body1">
        Contact Information: <Link href="https://www.instagram.com/mec.edu.in" target="_blank" rel="noopener">Instagram</Link>
      </Typography>
    );
    const newMessage = { text: contactMessage, sender: 'bot' };
    setChatMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const handleVideoUpload = (videoFile) => {
    const newVideo = {
      url: URL.createObjectURL(videoFile),
      type: videoFile.type,
    };
    setVideos((prevVideos) => [...prevVideos, newVideo]);
  };

  const handleCloseSignInForm = () => {
    setShowSignInForm(false); // Close the sign-in form
  };

  const handleSignInSuccess = () => {
    const newMessage = { text: 'Sign-in successful. Access granted to events.', sender: 'bot' };
    setChatMessages((prevMessages) => [...prevMessages, newMessage]);
    setSignInSuccess(true);
    setShowSignInForm(false);
  };

  const handleVideoClick = (video) => {
    setCurrentVideo(video);
    setShowVideoModal(true);
  };

  const handleCloseVideoModal = () => {
    setShowVideoModal(false);
    setCurrentVideo(null);
  };

  const handleVoiceInput = (speechResult) => {
    setChatMessages((prevMessages) => [...prevMessages, { text: speechResult, sender: 'user' }]);
    processChatbotResponse(speechResult);
  };

  const processChatbotResponse = async (userMessage) => {
    const botResponse = await getChatbotResponse(userMessage);
    setChatMessages((prevMessages) => [...prevMessages, { text: botResponse, sender: 'bot' }]);
  };

  return (
    <div>
      <Container maxWidth="md" style={{ marginTop: 30 }}>
        <Container
          sx={{
            backgroundColor: 'rgb(255,255,255)',
            padding: 3,
            borderRadius: '10px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <img
            src={process.env.PUBLIC_URL + '/main-logo.png'}
            alt="Chatbot "
            className="logo"
            style={{ width: '60%', height: 'auto' }}
          />
          <Typography
            variant="h4"
            component="h1"
            sx={{
              color: '',
              fontFamily: 'kolker brush',
              textTransform: 'uppercase',
              textAlign: 'center',
            }}
          >
            MecMate
          </Typography>
          <IconButton onClick={handleInfoClick}>
            <InfoIcon />
          </IconButton>
        </Container>

        {/* Modal for Sign-In Form */}
        <Modal open={showSignInForm} onClose={handleCloseSignInForm}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'transparent',
              boxShadow: 24,
              p: 4,
              borderRadius: '10px',
              backdropFilter: 'blur(10px)', // Makes the background transparent with blur effect
            }}
          >
            <SignInForm onSignInSuccess={handleSignInSuccess} onClose={handleCloseSignInForm} />
          </Box>
        </Modal>

        {/* Modal for Video Playback */}
        <Modal open={showVideoModal} onClose={handleCloseVideoModal}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '80%',
              bgcolor: 'black',
              boxShadow: 24,
              p: 4,
              borderRadius: '10px',
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={handleCloseVideoModal}
              sx={{
                position: 'absolute',
                top: 10,
                right: 10,
              }}
            >
              Close
            </Button>
            {currentVideo && (
              <video width="100%" controls>
                <source src={currentVideo.url} type={currentVideo.type} />
                Your browser does not support the video tag.
              </video>
            )}
          </Box>
        </Modal>

        <div className="chatbox" ref={chatbox}>
          {chatMessages.map((message, index) => (
            <div
              key={index}
              style={{
                textAlign: message.sender === 'user' ? 'right' : 'left',
                marginBottom: '10px',
              }}
            >
              <Typography
                variant="body1"
                style={{
                  backgroundColor: message.sender === 'user' ? '#007bff' : '#808080',
                  color: 'white',
                  display: 'inline-block',
                  padding: '8px 12px',
                  borderRadius: '10px',
                  maxWidth: '70%',
                }}
              >
                {message.text}
              </Typography>
            </div>
          ))}
        </div>
        {signInSuccess && (
          <VideoUpload
            onVideoUpload={handleVideoUpload}
            onClose={() => setSignInSuccess(false)}
          />
        )}

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginTop: '20px',
            background: '#FFFFFF',
            borderRadius: '10px',
            paddingRight: '10px',
            marginBottom: '10px',
          }}
        >
          <TextField
            type="text"
            placeholder="Type your message here..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            sx={{ flexGrow: 1, marginRight: '2px' }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') sendMessage();
            }}
          />
          <VoiceAssistant onVoiceInput={handleVoiceInput} />
          <Button variant="rounded" onClick={sendMessage}>
            <ArrowUpwardIcon />
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default App;
