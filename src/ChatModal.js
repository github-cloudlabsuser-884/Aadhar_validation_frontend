import React from 'react';
import Chatbot from './Chatbot'; // Import your Chatbot component

function ChatModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <Chatbot />
        {/* <button onClick={onClose}>Close</button> */}
      </div>
    </div>
  );
}

export default ChatModal;
