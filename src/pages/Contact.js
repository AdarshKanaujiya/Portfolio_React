import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    
    // Simulate form submission
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'adarsh@example.com',
      href: 'mailto:adarsh@example.com'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 98765 43210',
      href: 'tel:+919876543210'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Bangalore, India',
      href: null
    }
  ];

  return (
    <motion.div
      className="contact-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="contact-header" variants={itemVariants}>
        <h1>Get In Touch</h1>
        <p>Let's discuss your next project or just have a coffee chat</p>
      </motion.div>

      <div className="contact-content">
        <motion.div className="contact-info" variants={itemVariants}>
          <h2>Contact Information</h2>
          <div className="info-grid">
            {contactInfo.map((info, index) => (
              <motion.div 
                key={index} 
                className="info-item"
                whileHover={{ scale: 1.05 }}
                variants={itemVariants}
              >
                <info.icon size={24} />
                <div>
                  <h3>{info.label}</h3>
                  {info.href ? (
                    <a href={info.href}>{info.value}</a>
                  ) : (
                    <span>{info.value}</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div className="contact-form" variants={itemVariants}>
          <h2>Send Me a Message</h2>
          <form onSubmit={handleSubmit}>
            <motion.div 
              className="form-group"
              whileHover={{ scale: 1.02 }}
            >
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
              />
            </motion.div>

            <motion.div 
              className="form-group"
              whileHover={{ scale: 1.02 }}
            >
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
              />
            </motion.div>

            <motion.div 
              className="form-group"
              whileHover={{ scale: 1.02 }}
            >
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="What's this about?"
              />
            </motion.div>

            <motion.div 
              className="form-group"
              whileHover={{ scale: 1.02 }}
            >
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                placeholder="Tell me about your project..."
              />
            </motion.div>

            <motion.button
              type="submit"
              className={`btn btn-primary ${status}`}
              disabled={status !== 'idle'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {status === 'sending' && (
                <>
                  <div className="spinner" />
                  Sending...
                </>
              )}
              {status === 'success' && (
                <>
                  <CheckCircle size={20} />
                  Message Sent!
                </>
              )}
              {status === 'error' && (
                <>
                  <AlertCircle size={20} />
                  Try Again
                </>
              )}
              {status === 'idle' && (
                <>
                  <Send size={20} />
                  Send Message
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>

      <motion.div className="social-links" variants={itemVariants}>
        <h3>Connect With Me</h3>
        <div className="social-grid">
          <motion.a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            className="social-link"
          >
            GitHub
          </motion.a>
          <motion.a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            className="social-link"
          >
            LinkedIn
          </motion.a>
          <motion.a 
            href="https://twitter.com" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            className="social-link"
          >
            Twitter
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Contact;
