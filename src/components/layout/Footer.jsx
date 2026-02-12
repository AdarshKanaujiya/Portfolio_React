import React from 'react';
import { motion } from 'framer-motion';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.footer
      className="footer"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="footer-container">
        <motion.div className="footer-content" variants={itemVariants}>
          <div className="footer-brand">
            <h3>Adarsh Kanaujiya</h3>
            <p>Full Stack Developer</p>
          </div>

          <div className="footer-links">
            <motion.a href="#hero" variants={itemVariants}>
              Home
            </motion.a>
            <motion.a href="#about" variants={itemVariants}>
              About
            </motion.a>
            <motion.a href="#projects" variants={itemVariants}>
              Projects
            </motion.a>
            <motion.a href="#contact" variants={itemVariants}>
              Contact
            </motion.a>
          </div>
        </motion.div>

        {/* <motion.div className="footer-divider" variants={itemVariants} /> */}

        <motion.div className="footer-bottom" variants={itemVariants}>
          <p>© {currentYear} Adarsh Kanaujiya. All rights reserved.</p>
          <p className="design-credit">
            Designed & Developed with
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.6, repeat: Infinity }}
            >
              ❤️
            </motion.span>
            using React, Framer Motion & GSAP
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
