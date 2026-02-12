import React, { useRef } from 'react';
import { motion } from 'framer-motion';
// import gsap from 'gsap';
// import ScrollTrigger from 'gsap/ScrollTrigger';
import './About.css';

// gsap.registerPlugin(ScrollTrigger);

const About = () => {
  // const sectionRef = useRef(null);
  const maskRef = useRef(null);

  const handlePointerMove = (event) => {
    const el = maskRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Set mask on container directly
    el.parentElement.style.setProperty("--mask-x", `${x}px`);
    el.parentElement.style.setProperty("--mask-y", `${y}px`);
  };

  const handlePointerLeave = () => {
    const el = maskRef.current;
    if (!el) return;

    el.parentElement.style.setProperty("--mask-x", `-999px`);
    el.parentElement.style.setProperty("--mask-y", `-999px`);
  };

  const experience = [
    {
      year: '2025 - Present',
      role: 'Full Stack Developer',
      company: 'Lunar Finis pvt ltd',
      description: 'Currently working on building a cutting-edge fintech platform that leverages AI to provide personalized financial insights and investment recommendations.',
    },
    {
      year: '2025 - 2025',
      role: 'Full Stack Developer',
      company: 'SpiroEdu pvt ltd',
      description: 'Developed E-learning platform for the Client CDAC, from buying the course till completion and issuing the certificates with proper security and optimization.',
    },
    {
      year: '2024 - 2025',
      role: 'Junior Frontend Developer',
      company: 'Sakec college',
      description: 'Built first year mini project which helps students to visualize Gravity on differnt planets.',
    },
  ];

  const education = [
    {
      year: '2023-2027',
      degree: 'Bachelor of Technology CS',
      school: 'Shah and Anchor Kutchhi Engineering College',
      field: 'Computer Science',
    },
    {
      year: '2020-2022',
      degree: 'HSC',
      school: 'Ruia Junior College',
      field: 'Science',
    },
  ];

  // GSAP scroll animations removed to prevent conflict with Framer Motion
  // Framer Motion whileInView handles all scroll animations

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="about-section">
      <div className="container">
        {/* Intro with Masked Image */}
        <motion.div
          className="about-intro"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">About Me</h2>

          <p className="about-intro-text">
            I'm a passionate Full Stack Developer with <span style={{color:"orange"}}>1.5+ years of experience</span> crafting elegant,
            high-performance digital experiences. My expertise spans modern web technologies, motion design,
            and creating meaningful user interactions that delight and engage.
          </p>
          
          {/* Layered Mask Container - Image behind, Text overlay */}
          <div className="about-mask-container">
            {/* Image Layer - Behind (absolute) */}
            <div className="about-image-mask">
              <img 
                src="\personal pic.jpg" 
                alt="Profile" 
                className="mask-image"
              />
            </div>

            {/* Text Layer - Overlay with mask (absolute) */}
            <p className="intro-text">
              I'm a passionate Full Stack Developer with <span style={{color:"orange"}}>1.5+ years of experience</span> crafting elegant,
              high-performance digital experiences. My expertise spans modern web technologies, motion design,
              and creating meaningful user interactions that delight and engage.
            </p>

            {/* Hover Overlay - Only over image area */}
            <div
              className="hover-overlay"
              ref={maskRef}
              onMouseMove={handlePointerMove}
              onMouseLeave={handlePointerLeave}
              onTouchMove={(event) => handlePointerMove(event.touches[0])}
              onTouchEnd={handlePointerLeave}
            />
          </div>
        </motion.div>

        <div className="about-content">
          {/* Experience Timeline */}
          <motion.div
            className="timeline-section"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h3 className="timeline-title">Experience</h3>
            <div className="timeline">
              {experience.map((item, index) => (
                <motion.div
                  key={index}
                  className="timeline-item glass-effect-strong"
                  variants={itemVariants}
                >
                  <div className="timeline-marker">
                    <div className="marker-dot"></div>
                    <div className="marker-line"></div>
                  </div>
                  <div className="timeline-content">
                    <span className="timeline-year">{item.year}</span>
                    <h4 className="timeline-role">{item.role}</h4>
                    <p className="timeline-company">{item.company}</p>
                    <p className="timeline-description">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Education Timeline */}
          <motion.div
            className="timeline-section"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h3 className="timeline-title">Education</h3>
            <div className="timeline">
              {education.map((item, index) => (
                <motion.div
                  key={index}
                  className="timeline-item glass-effect-strong"
                  variants={itemVariants}
                >
                  <div className="timeline-marker">
                    <div className="marker-dot"></div>
                    <div className="marker-line"></div>
                  </div>
                  <div className="timeline-content">
                    <span className="timeline-year">{item.year}</span>
                    <h4 className="timeline-role">{item.degree}</h4>
                    <p className="timeline-company">{item.school}</p>
                    <p className="timeline-description">{item.field}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
