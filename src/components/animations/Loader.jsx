import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import './Loader.css';

const Loader = ({ onComplete }) => {
  const [displayText, setDisplayText] = useState('');
  const loaderText = 'ADARSH';

  useEffect(() => {
    // Animate text character by character
    let charIndex = 0;
    const textInterval = setInterval(() => {
      if (charIndex <= loaderText.length) {
        setDisplayText(loaderText.substring(0, charIndex));
        charIndex++;
      } else {
        clearInterval(textInterval);
      }
    }, 100);

    return () => clearInterval(textInterval);
  }, []);

  useEffect(() => {
    const timeline = gsap.timeline({
      onComplete: onComplete,
    });

    // Initial animation - build up the loader
    timeline
      .to('.loader-container', {
        duration: 0.3,
        opacity: 1,
      }, 0)
      .to(
        '.loader-progress-bar',
        {
          duration: 2,
          width: '100%',
          ease: 'power2.inOut',
        },
        0.3
      )
      .to(
        '.loader-text',
        {
          duration: 0.6,
          opacity: 1,
          y: 0,
        },
        0.5
      )
      .to(
        '.loader-dot',
        {
          duration: 0.4,
          repeat: 3,
          opacity: 0.3,
        },
        1
      )
      // Exit animation
      .to(
        '.loader-container',
        {
          duration: 0.8,
          opacity: 0,
          y: -30,
          ease: 'power2.inOut',
        },
        2.5
      );
  }, [onComplete]);

  return (
    <div className="loader-container">
      <div className="loader-content">
        <div className="loader-text">
          {displayText}
          <span className="loader-dot">.</span>
        </div>
        <div className="loader-progress-wrapper">
          <div className="loader-progress-bar"></div>
        </div>
        <p className="loader-subtitle">Loading Experience</p>
      </div>
    </div>
  );
};

export default Loader;
