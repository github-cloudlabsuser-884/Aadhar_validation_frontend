import React, { useState,useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faStop, faFileUpload, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faUser, faRobot } from '@fortawesome/free-solid-svg-icons';
import './App.css';


function Chatbot() {
  const [messages, setMessages] = useState([
    { text: "Welcome! I'm here to assist you with validating your documentation. Please upload the document.", sender: "bot", timestamp: getCurrentTime() }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recordButtonColor, setRecordButtonColor] = useState('');
  const [documentPreview, setDocumentPreview] = useState(null); // State to hold document preview URL

  const sendMessageUrl = 'http://localhost:3000/api/send-message';
  const uploadDocumentUrl = 'http://localhost:3000/api/upload-document';

  const messagesEndRef = useRef(null); // Reference to the last message element

  
  const handleMessageSend = async () => {
    if (inputValue.trim() === "") return;
  
    try {
      const userMessage = {
        text: inputValue,
        sender: "user",
        timestamp: getCurrentTime()
      };
      setMessages(prevMessages => [...prevMessages, userMessage]);
    
      const response = await fetch(sendMessageUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: inputValue })
      });
  
      if (!response.ok) {
        throw new Error('Failed to send message');
      }
  
      const data = await response.json();
      const botMessage = {
        text: data.message,
        sender: "bot",
        timestamp: getCurrentTime()
      };
      setMessages(prevMessages => [...prevMessages, botMessage]);
      
    } catch (error) {
      console.error('Error sending message:', error);
    }
  
    setInputValue("");
  };
  

  const handleDocumentUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      const userMessage = {
        text: 'Uploading document...',
        sender: "user",
        timestamp: getCurrentTime()
      };
      setMessages(prevMessages => [...prevMessages, userMessage]);

      const response = await fetch(uploadDocumentUrl, {
        method: 'POST',
        body: formData
      });
  
      if (!response.ok) {
        throw new Error('Failed to upload document');
      }
  
      const data = await response.json();
      const uploadMessage = {
        text: 'Document uploaded successfully',
        sender: "user",
        timestamp: getCurrentTime()
      };
      setMessages(prevMessages => [...prevMessages, uploadMessage]);
      await new Promise(resolve => setTimeout(resolve, 2000)); // Adjust delay time as needed

      if (data.validationStatus === 'success') {
        // Set document preview URL
        setDocumentPreview(data.url);
        // Set the document preview message in user response
        const documentMessage = {
          sender: "user",
          type: "document",
          path: data.url,
          timestamp: getCurrentTime()
        };
  //      setMessages(prevMessages => [...prevMessages, documentMessage]);
        
        // Mask Aadhar number if exists
        if (data.data.AadharNumber) {
          const maskedAadharNumber = maskAadharNumber(data.data.AadharNumber);
          data.data.AadharNumber = maskedAadharNumber;
        }
  
        const extractedDataString = Object.entries(data.data)
          .filter(([key, value]) => value !== "") // Filter out empty values
          .map(([key, value]) => `${key}: ${value}`)
          .join("\n\n"); // Change comma to comma and newline character
          const validationSuccessMessage = {
            text: 'Document Validation Success',
            sender: "bot",
            timestamp: getCurrentTime()
          };
          setMessages(prevMessages => [...prevMessages, validationSuccessMessage]);
          await new Promise(resolve => setTimeout(resolve, 1000)); // Adjust delay time as needed
          const verifiedDataMessage = {
            text: `Verified Data: ${extractedDataString}`,
            sender: "bot",
            timestamp: getCurrentTime()
          };
          setMessages(prevMessages => [...prevMessages, verifiedDataMessage]);
      } else {
        const validationFailedMessage = {
          text: 'Document validation failed',
          sender: "bot",
          timestamp: getCurrentTime()
        };
        setMessages(prevMessages => [...prevMessages, validationFailedMessage]);
      }
    } catch (error) {
      console.error('Error uploading document:', error);
    }
  };
  

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleMessageSend();
    }
  };

  const handleVoiceRecording = () => {
    if (!isRecording) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = 'en-US';
      recognition.start();
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(transcript);
        setIsRecording(false);
        setRecordButtonColor('');
      };
      recognition.onend = () => {
        setIsRecording(false);
        setRecordButtonColor('');
      };
      setIsRecording(true);
      setRecordButtonColor('red');
    } else {
      setIsRecording(false);
      setRecordButtonColor('');
    }
  };

  function maskAadharNumber(aadharNumber) {
    // Mask all but the last 4 digits
    const maskedDigits = aadharNumber.slice(0, -4).replace(/\d/g, '*');
    const lastFourDigits = aadharNumber.slice(-4);
    return maskedDigits + lastFourDigits;
  }

  // Helper function to get current time in HH:MM format
  function getCurrentTime() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.sender === "user" && (
              <>
                {/* <FontAwesomeIcon icon={faUser} className="message-icon" /> */}
                <img src="https://img.freepik.com/premium-photo/male-female-profile-avatar-user-avatars-gender-icons_1020867-74925.jpg?w=740" alt="Bot" className="message-icon user-icon" />
   
                <div className="message-text">{message.text}</div>
                <div className="message-time">{message.timestamp}</div>
                {/* {message.type === "document" && (
                  <div className="document-preview">
                    <img src={message.path} alt="Document Preview" />
                  </div>
                )} */}
              </>
            )}
            {message.sender === "bot" && (
              <>
                {/* <FontAwesomeIcon icon={faRobot} className="message-icon" /> */}
                <img src="https://img.freepik.com/premium-vector/robot-icon-chat-bot-sign-support-service-concept-chatbot-character-flat-style_41737-796.jpg?w=740" alt="Bot" className="message-icon bot-icon" />
   
                <div className="message-text">{message.text}</div>
                <div className="message-time">{message.timestamp}</div>
                {/* {message.type === "document" && (
                  <div className="document-preview">
                    <img src={message.url} alt="Document Preview" />
                  </div>
                )} */}
              </>
            )}
          </div>
        ))}
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          className="input-field"
        />
        {inputValue.trim() !== '' && (
          <button onClick={handleMessageSend} className="send-button">
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        )}
        {!isRecording && inputValue.trim() === '' && (
          <button onClick={handleVoiceRecording} className="record-button" style={{ backgroundColor: recordButtonColor }}>
            <FontAwesomeIcon icon={faMicrophone} />
          </button>
        )}
        {isRecording && (
          <button onClick={handleVoiceRecording} className="record-button" style={{ backgroundColor: recordButtonColor }}>
            <FontAwesomeIcon icon={faStop} />
          </button>
        )}
        <label className="upload-button">
          <input type="file" onChange={handleDocumentUpload} accept=".pdf,.doc,.docx,.png,.jpg" />
          <FontAwesomeIcon icon={faFileUpload} />
        </label>
      </div>
    </div>
  );
}

export default Chatbot;
