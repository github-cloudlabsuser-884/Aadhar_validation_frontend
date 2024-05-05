import React, { useState } from 'react';
import ChatModal from './ChatModal';
import './App.css';
function ChatPopUp() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleChatToggle = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="App" style={{ position: 'relative', minHeight: '100vh' }}>
      {/* <Header />
     <MainContent/>
      */}
      {/* Text "Hi, Need some help?" positioned to the left side of the image */}
      {!isChatOpen && (
        <div class='help'style={{ position: 'absolute', top: '79%', left: '65%', textAlign: 'left', zIndex: '1', padding: '8px', borderRadius: '4px', background:'##63a3e8',fontFamily:'serif' }}>
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
      />
      
      {/* Text "Ask me" positioned below the image */}
      <div style={{ position: 'absolute', bottom: '26px', right: '18px', textAlign: 'center', zIndex: '1',fontFamily:'serif' }}>
        Ask AI Recognize
      </div>
      {/* <Footer/> */}
    </div>
    
  );
  
}

export default ChatPopUp;
