// Header.js
import React from 'react';
import './Header.css'; // Assuming you have a separate CSS file for Header styling

function Header() {
  return (
    <header className="header">
      <div className="logo">
  {/* Your logo component or image */}
  <img src="bank_logo.png" alt="" />
  <span className="logo-text">Ai Recognize</span>
</div>

      <nav className="navigation">
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Accounts</a></li>
          <li><a href="#">Transfers</a></li>
          <li><a href="#">Payments</a></li>
          <li><a href="#">Services</a></li>
        </ul>
      </nav>
      <div className="user-options">
        <ul>
          <li><a href="#">Login</a></li>
          <li><a href="#">Sign Up</a></li>
          <li><a href="#">Language</a></li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
