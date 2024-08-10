import React from 'react';
import { Typography, Link } from '@mui/material'; // Import necessary components from Material-UI

const collegeInfo = {
  college_name: "MUTHAYAMMAL ENGINEERING COLLEGE",
  principal_name: "DR.MADHESWARAN",
  class_advisor: "THENMOZHI MAM"
};

const classInfo = {
  class_name: "AI & DS Class B",
  student_names: ["Selvarasan", "Dharun Prakash", "Lenin", "Sam Prakash", "Gowtham"]
};

const responses = {
  greetings: [
    "Hello Selvarasan!",
    "Hi there!",
    "Hey! How can I assist you?",
    "Greetings!",
    "Good day!",
    "Hi, what can I do for you?",
    "Howdy!",
    "Hey there, how are you?",
    "Hello! How may I help you today?",
    "Hi! What's up?"
  ],
  farewell: [
    "Goodbye!",
    "See you later!",
    "Take care Selvarasan!",
    "Farewell!",
    "Until next time!",
    "Bye for now!",
    "Catch you later!",
    "Have a great day!",
    "Goodbye! Take care!",
    "Adios!",
    "So long!"
  ],
  thanks: [
    "Thank you!",
    "Thanks a lot!",
    "Thanks a bunch!",
    "Appreciate it!",
    "Thanks so much!",
    "Thank you very much!",
    "Thanks for your help!",
    "I'm grateful, thanks!",
    "Thanks a million!",
    "Thanks for everything!",
    "Thank you kindly!"
  ],
  "you're welcome": [
    "You're welcome!",
    "No problem!",
    "It was my pleasure!",
    "Anytime!",
    "Glad to help!",
    "Don't mention it!",
    "Happy to assist!",
    "You got it!",
    "Sure thing!",
    "Of course!",
    "Always here to help!"
  ],
  about: [
    "I am a simple MEC Personal Chatbot created using Python!",
    "I'm a MEC Personal Chatbot designed to assist you with various tasks.",
    "I'm just a humble MEC Personal Chatbot here to help you out!",
    "I am an AI-powered MEC Personal Chatbot programmed to assist you.",
    "I'm here to answer your questions and provide assistance.",
    "I'm a virtual assistant programmed to respond to your queries.",
    "I'm your friendly MEC Personal Chatbot ready to lend a hand!",
    "I'm an artificial intelligence designed to interact with users like you!",
    "I'm a digital assistant programmed to make your life easier.",
    "I am a MEC Personal MEC Personal Chatbot powered by AI to help you with your inquiries.",
    "I'm a virtual helper designed to make your day a bit smoother."
  ],
  fallback: [
    "Sorry, I didn't get that. Can you please rephrase?",
    "I'm not sure I understand. Could you provide more details?",
    "Apologies, I didn't catch that. Can you repeat?",
    "Hmm, I'm having trouble understanding. Could you try again?",
    "I'm afraid I didn't comprehend that. Can you try a different wording?",
    "I didn't quite catch that. Can you please clarify?",
    "I'm sorry, I couldn't understand what you said. Can you try saying it differently?",
    "It seems like I didn't get that. Can you provide more context?",
    "I'm having difficulty understanding. Can you please elaborate?",
    "I'm sorry, I'm not sure what you're asking. Can you try rephrasing?"
  ]
};

export const getChatbotResponse = (userMessage) => {
  const normalizedMessage = userMessage.toLowerCase();

  if (normalizedMessage.includes('hello') || normalizedMessage.includes('hi')) {
    return 'Hello! How can I assist you today?';
  } else if (normalizedMessage.includes('about college')) {
    return `${collegeInfo.college_name} is an autonomous institution affiliated to Anna University accredited by NAAC and NBA.`;
  } else if (normalizedMessage.includes('location')) {
    return (
      <Typography>
        The location of {collegeInfo.college_name} is in Rasipuram. Here is the location link: {' '}
        <Link href="https://maps.app.goo.gl/gR3inY8kNfqj5aXJ6" target="_blank" rel="noopener">
          View Map
        </Link>
      </Typography>
    );
  } else if (normalizedMessage.includes('courses')) {
    return 'We offer various courses in engineering. For more details, visit our website.';
  } else if (normalizedMessage.includes('total students')) {
    return 'There are about 5000 students from first year to final years.';
  } else if (normalizedMessage.includes('laboratories available')) {
    return 'There are more than 10 computer labs with different purposes.';
  } else if (normalizedMessage.includes('principal name')) {
    return collegeInfo.principal_name;
  } else if (normalizedMessage.includes('class advisor name')) {
    return collegeInfo.class_advisor;
  } else if (normalizedMessage.includes('class name')) {
    return classInfo.class_name;
  } else if (normalizedMessage.includes('student names')) {
    return `The students in ${classInfo.class_name} are: ${classInfo.student_names.join(', ')}.`;
  } else if (normalizedMessage.includes('hod of ai&ds')) {
    return 'DR.S.Vijayaragavan';
  } else if (normalizedMessage.includes('hod of cse')) {
    return 'DR.G.Kavitha';
  } else if (normalizedMessage.includes('hod of cybersecurity')) {
    return 'DR. [Name]';
  } else if (normalizedMessage.includes('hod of ece')) {
    return 'DR.U.Saravanakumar'; 
  } else if (normalizedMessage.includes('who created you')) {
    return 'Professional Developers R.Selvarasan, A.R.B.Vigneshwar, M.Lenin'; 
  } else if (normalizedMessage.includes('joint secretary name')) {
    return 'Loading...'; 
  } else if (normalizedMessage.includes('secretary name')) {
    return 'DR.Gunasekaran'; 
  } else if (normalizedMessage.includes('class advisor of ai&ds department')) {
    return 'Mrs.S.Thenmozhi'; 
  }else if (normalizedMessage.includes('how are you')) {
    return 'I am good,what about you'; 
  } else if (normalizedMessage.includes('how you doing')) {
    return 'Doing Great,so you'; 
  }
  else {
    return getAdditionalResponse(normalizedMessage);
  }
};

const getAdditionalResponse = (message) => {
  if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
    return responses.greetings[Math.floor(Math.random() * responses.greetings.length)];
  } else if (message.includes('bye') || message.includes('goodbye') || message.includes('farewell')) {
    return responses.farewell[Math.floor(Math.random() * responses.farewell.length)];
  } else if (message.includes('thank')) {
    return responses.thanks[Math.floor(Math.random() * responses.thanks.length)];
  } else if (message.includes('you\'re welcome') || message.includes('no problem')) {
    return responses["you're welcome"][Math.floor(Math.random() * responses["you're welcome"].length)];
  } else if (message.includes('about')) {
    return responses.about[Math.floor(Math.random() * responses.about.length)];
  } else {
    return responses.fallback[Math.floor(Math.random() * responses.fallback.length)];
  }
};
