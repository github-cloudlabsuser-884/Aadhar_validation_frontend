// Footer.js

import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section about">
            <h3>About Us</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              accumsan eros ac nisi blandit fermentum. Nam pulvinar, mi vitae
              vestibulum aliquet.
            </p>
            <div className="contact">
              <span><i className="fas fa-phone"></i> 123-456-7890</span>
              <span><i className="fas fa-envelope"></i> info@example.com</span>
            </div>
          </div>
          <div className="footer-section links">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/services">Services</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-section contact-form">
            <h3>Contact Us</h3>
            <form action="#">
              <input type="email" name="email" className="text-input contact-input" placeholder="Your email address" />
              <textarea name="message" className="text-input contact-input" placeholder="Your message"></textarea>
              <button type="submit" className="btn btn-primary">
                <i className="fas fa-envelope"></i> Send
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; 2024 Bank Name. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
