import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Minimize2, Maximize2 } from 'lucide-react';
import './PersonalAssistant.css';

const PersonalAssistant = () => {
    // console.log('🤖 Personal Assistant component rendering');
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm Adarsh's AI assistant. I'll follow you around! Ask me anything about his portfolio, skills, or projects!",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const assistantRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  // Log mount for debugging
  // useEffect(() => {
  //   console.log('🤖 Personal Assistant mounted and ready!');
  //   return () => console.log('🤖 Personal Assistant unmounted');
  // }, []);

  // Smooth cursor following
  useEffect(() => {
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const animate = () => {
      // Smooth interpolation
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;
      
      setPosition({
        x: currentX,
        y: currentY
      });

      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    const animationFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  // Track scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const portfolioContext = {
    name: "Adarsh",
    role: "Full Stack Developer",
    skills: ["JavaScript", "React", "Node.js", "Python", "MongoDB", "CSS/Sass", "GSAP", "Framer Motion"],
    experience: "3+ years of experience in web development",
    location: "Bangalore, India",
    projects: "Built 100+ projects including e-commerce platforms, weather apps, and todo applications",
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
    
    if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('hire')) {
      return `You can reach Adarsh through the Contact section below, or email him at adarsh@example.com. He's always open to discussing new opportunities!`;
    }
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return `Hello! Great to meet you. I'm here to help you learn more about Adarsh and his work. What would you like to know?`;
    }

    if (lowerMessage.includes('github') || lowerMessage.includes('repository')) {
      return `You can find Adarsh's GitHub at github.com/AdarshKanaujiya with amazing projects showcasing his coding skills!`;
    }

    if (lowerMessage.includes('animation') || lowerMessage.includes('motion')) {
      return `Adarsh loves creating smooth animations! This portfolio uses GSAP and Framer Motion for all the cool effects you're seeing. Pretty neat, right?`;
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

  const assistantPosition = {
    x: position.x + 20,
    y: position.y + 20
  };

  // console.log('🎯 PersonalAssistant rendering with position:', assistantPosition);

  return (
    <>
      {/* DEBUG: Giant red overlay to confirm component renders */}
      {/* <div style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        background: 'red',
        color: 'white',
        padding: '20px',
        zIndex: 999999,
        fontSize: '20px',
        fontWeight: 'bold',
        border: '5px solid yellow'
      }}>
        🤖 ASSISTANT IS RENDERING!
        <br />
        Position: {Math.round(assistantPosition.x)}, {Math.round(assistantPosition.y)}
      </div> */}

      {/* Floating Assistant Character */}
      <motion.div
        ref={assistantRef}
        className={`personal-assistant ${isHovering ? 'hovering' : ''} ${isOpen ? 'chatting' : ''}`}
        style={{
          position: 'fixed',
          left: assistantPosition.x,
          top: assistantPosition.y,
          pointerEvents: 'auto',
          zIndex: 9999,
          cursor: 'pointer'
        }}
        onMouseEnter={() => {
          // console.log('👆 Mouse entered assistant');
          setIsHovering(true);
        }}
        onMouseLeave={() => {
          // console.log('👋 Mouse left assistant');
          setIsHovering(false);
        }}
        onClick={() => {
          // console.log('🖱️ Assistant clicked!');
          setIsOpen(true);
          setIsMinimized(false);
        }}
      >
        <motion.div
          className="assistant-character"
          animate={{
            scale: isHovering ? 1.2 : 1,
            rotate: isHovering ? [0, -5, 5, -5, 0] : 0
          }}
          transition={{
            rotate: {
              duration: 0.5,
              repeat: isHovering ? Infinity : 0,
              repeatDelay: 0.5
            }
          }}
          style={{ pointerEvents: 'auto', cursor: 'pointer' }}
        >
          <div 
            className="assistant-avatar"
            style={{ pointerEvents: 'auto', cursor: 'pointer' }}
            onClick={(e) => {
              console.log('🖱️ Avatar clicked!');
              e.stopPropagation();
              setIsOpen(true);
              setIsMinimized(false);
            }}
          >
            <Bot size={isMinimized ? 24 : 32} />
            <motion.div
              className="assistant-glow"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{ pointerEvents: 'none' }}
            />
          </div>
          
          {isHovering && isMinimized && (
            <motion.div
              className="assistant-tooltip"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              Click to chat!
            </motion.div>
          )}
        </motion.div>

        {/* Cursor trail effect */}
        <motion.div
          className="cursor-trail"
          animate={{
            scale: [0, 1, 0],
            opacity: [0.5, 0, 0]
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="assistant-chat-window"
            initial={{ opacity: 0, scale: 0.8, x: -100, y: -100 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: -100, y: -100 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300
            }}
            style={{
              position: 'fixed',
              bottom: '20px',
              right: '20px',
              pointerEvents: 'auto',
              opacity: 1,
              zIndex: 99999
            }}
          >
            <div className="chat-header glass-effect">
              <div className="chat-title">
                <Bot size={20} />
                <div>
                  <span className="chat-name">AI Assistant</span>
                  <span className="chat-status">Online</span>
                </div>
              </div>
              <div className="chat-actions">
                <motion.button
                  className="chat-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMinimized(!isMinimized);
                    if (!isMinimized) setIsOpen(false);
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                </motion.button>
                <motion.button
                  className="chat-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                    setIsMinimized(true);
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={16} />
                </motion.button>
              </div>
            </div>

            <div className="chat-messages">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`message ${message.sender}`}
                  initial={{ opacity: 0, x: message.sender === 'bot' ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="message-avatar">
                    {message.sender === 'bot' ? (
                      <Bot size={16} />
                    ) : (
                      <User size={16} />
                    )}
                  </div>
                  <div className="message-bubble">
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
                  className="message bot"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="message-avatar">
                    <Bot size={16} />
                  </div>
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="chat-input glass-effect">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask me anything..."
                disabled={isTyping}
              />
              <motion.button 
                type="submit" 
                disabled={!inputMessage.trim() || isTyping}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="send-btn"
              >
                <Send size={18} />
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PersonalAssistant;
