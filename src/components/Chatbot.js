import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm Adarsh's AI assistant. Ask me anything about his portfolio, skills, or projects!",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const portfolioContext = {
    name: "Adarsh",
    role: "Full Stack Developer",
    skills: ["JavaScript", "React", "Node.js", "Python", "MongoDB", "CSS/Sass"],
    experience: "2+ years of experience in web development",
    location: "Mumbai, India",
    projects: "Built 10+ projects including e-learning platforms & AI chatbots",
    education: "Bachelor's degree in Computer Science",
    interests: "Open source contribution, AI/ML, cloud computing"
  };

  const generateResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('skill') || lowerMessage.includes('technology')) {
      return `Adarsh is proficient in ${portfolioContext.skills.join(', ')}. He has ${portfolioContext.experience} and loves working with modern web technologies.`;
    }
    
    if (lowerMessage.includes('project') || lowerMessage.includes('work')) {
      return `Adarsh has ${portfolioContext.projects}. You can check them out in the Projects section of this portfolio!`;
    }
    
    if (lowerMessage.includes('experience') || lowerMessage.includes('background')) {
      return `${portfolioContext.name} has ${portfolioContext.experience} based in ${portfolioContext.location}. He holds a ${portfolioContext.education}.`;
    }
    
    if (lowerMessage.includes('contact') || lowerMessage.includes('reach')) {
      return `You can reach Adarsh through the Contact page, or email him at adarshkanoujiya2004@gmail.com He's always open to discussing new opportunities!`;
    }
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return `Hello! Great to meet you. I'm here to help you learn more about Adarsh and his work. What would you like to know?`;
    }
    
    return `Thanks for your question! Adarsh is a passionate ${portfolioContext.role} with expertise in ${portfolioContext.skills.slice(0, 3).join(', ')}. Feel free to ask about his projects, skills, or experience!`;
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: generateResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const chatVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 100
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    }
  };

  return (
    <>
      <motion.button
        className="chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          rotate: isOpen ? 180 : 0
        }}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chatbot-container"
            variants={chatVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="chatbot-header">
              <div className="chatbot-title">
                <Bot size={20} />
                <span>AI Assistant</span>
              </div>
              <button 
                className="chatbot-close"
                onClick={() => setIsOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="chatbot-messages">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`message ${message.sender}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="message-avatar">
                    {message.sender === 'bot' ? <Bot size={16} /> : <User size={16} />}
                  </div>
                  <div className="message-content">
                    <p>{message.text}</p>
                    <span className="message-time">
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  className="typing-indicator"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="chatbot-input">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask me anything..."
                disabled={isTyping}
              />
              <button 
                type="submit" 
                disabled={!inputMessage.trim() || isTyping}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
