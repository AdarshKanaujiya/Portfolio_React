import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Github, Linkedin, Mail, Download, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const { isDarkMode } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  const typewriterVariants = {
    hidden: { width: 0 },
    visible: {
      width: "100%",
      transition: {
        duration: 2,
        ease: "easeInOut"
      }
    }
  };

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/Adarsh Resume.pdf';
    link.download = 'Adarsh_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div
      className="home-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="hero-section">
        <motion.div className="hero-content" variants={itemVariants}>
          <motion.h1 className="hero-title" variants={itemVariants}>
            Hi, I'm <span className="highlight">Adarsh</span>
          </motion.h1>
          
          <motion.div className="typewriter-container" variants={itemVariants}>
            <motion.h2 
              className="hero-subtitle"
              variants={typewriterVariants}
              initial="hidden"
              animate="visible"
            >
              Full Stack Developer
            </motion.h2>
          </motion.div>
          
          <motion.p className="hero-description" variants={itemVariants}>
            I create beautiful, responsive web applications with modern technologies.
            Passionate about clean code, user experience, and continuous learning.
          </motion.p>
          
          <motion.div className="hero-actions" variants={itemVariants}>
            <motion.button 
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              as={Link}
              to="/projects"
            >
              View Projects <ArrowRight size={20} />
            </motion.button>
            <motion.button 
              className="btn btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownloadResume}
            >
              <Download size={20} /> Download Resume
            </motion.button>
          </motion.div>
          
          <motion.div className="social-links" variants={itemVariants}>
            <motion.a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github size={24} />
            </motion.a>
            <motion.a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Linkedin size={24} />
            </motion.a>
            <motion.a 
              href="mailto:adarsh@example.com"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <Mail size={24} />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Home;
