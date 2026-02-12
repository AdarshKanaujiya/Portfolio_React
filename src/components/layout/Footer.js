import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>Adarsh Kanaujiya</h3>
            <p>Full Stack Developer</p>
          </div>
          <div className="footer-links">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Adarsh Kanaujiya. All rights reserved.</p>
          <div className="design-credit">
            <span>Designed & Built with</span>
            <span>❤️</span>
            <span>using React, Framer Motion & GSAP</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
