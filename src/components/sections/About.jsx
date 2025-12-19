import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);

  const experience = [
    {
      year: '2022 - Present',
      role: 'Senior Frontend Engineer',
      company: 'Tech Innovations',
      description: 'Led development of high-performance web applications with focus on animations and UX.',
    },
    {
      year: '2020 - 2022',
      role: 'Frontend Developer',
      company: 'Digital Solutions',
      description: 'Developed responsive web applications using React and modern CSS techniques.',
    },
    {
      year: '2018 - 2020',
      role: 'Junior Frontend Developer',
      company: 'StartUp Lab',
      description: 'Built user interfaces and contributed to full-stack web development.',
    },
  ];

  const education = [
    {
      year: '2018',
      degree: 'Bachelor of Technology',
      school: 'University of Technology',
      field: 'Computer Science',
    },
    {
      year: '2020',
      degree: 'Advanced Web Development Certification',
      school: 'Tech Academy',
      field: 'Modern Web Technologies',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.timeline-item');
      items.forEach((item, index) => {
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            markers: false,
          },
          opacity: 0,
          x: index % 2 === 0 ? -50 : 50,
          duration: 0.6,
          delay: 0.1,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
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
    <section className="about-section" ref={sectionRef}>
      <div className="container">
        {/* Intro */}
        <motion.div
          className="about-intro"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">About Me</h2>
          <p className="intro-text">
            I'm a passionate frontend engineer and UI/UX designer with 5+ years of experience crafting elegant,
            high-performance digital experiences. My expertise spans modern web technologies, motion design,
            and creating meaningful user interactions that delight and engage.
          </p>
        </motion.div>

        <div className="about-content">
          {/* Experience Timeline */}
          <motion.div
            className="timeline-section"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
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
            viewport={{ once: true, margin: '-100px' }}
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
