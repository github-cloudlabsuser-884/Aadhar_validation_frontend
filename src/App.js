import React, { useState } from 'react';
import ChatModal from './ChatModal';
import Header from './Header';
import './App.css';
import MainContent from './MainContent';
import Footer from './Footer';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleChatToggle = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div style={{ 
      backgroundImage: 'url(https://cdn.vectorstock.com/i/1000v/19/02/mobile-phone-and-internet-banking-secure-online-vector-34981902.avif)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      position: 'relative'
    }}>
      {/* <Header /> */}
      {/* Help text */}
      {!isChatOpen && (
        <div className='help' style={{ position: 'absolute', top: '79%', left: '65%', textAlign: 'left', zIndex: '1', padding: '8px', borderRadius: '4px',
         background: '#63a3e8',
          fontFamily: 'serif',
          color:'white' }}>
          Hi, looking for help with document validation?
        </div>
      )}
      {/* Chat modal */}
      {isChatOpen && (
        <ChatModal onClose={handleChatToggle} style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: '9999' }} />
      )}
      {/* Image button */}
      <button
        style={{
          position: 'absolute',
          bottom: '45px',
          right: '20px',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          cursor: 'pointer',
          border: 'none',
          backgroundImage: 'url(https://thumbs.dreamstime.com/b/robot-icon-chat-bot-sign-support-service-concept-chatbot-character-flat-style-124978455.jpg)',
          backgroundSize: 'cover',
        }}
        onClick={handleChatToggle}
        aria-label="Open Chat"
      />
      {/* Text "Ask me" positioned below the image */}
      <div style={{ position: 'absolute', bottom: '26px', right: '18px', textAlign: 'center', zIndex: '1', fontFamily: 'serif' ,color:'white'}}>
        Ask AI Recognize
      </div>
      {/* <Footer/> */}
    </div>
  );
}

export default App;
