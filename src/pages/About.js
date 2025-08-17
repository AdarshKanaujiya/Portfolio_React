import React from 'react';
import { motion } from 'framer-motion';
import { Download, Award, Code, Users, TrendingUp } from 'lucide-react';

const About = () => {
  const skills = [
    { name: 'JavaScript', level: 90 },
    { name: 'React', level: 85 },
    { name: 'Node.js', level: 80 },
    { name: 'Python', level: 75 },
    { name: 'MongoDB', level: 70 },
    { name: 'CSS/Sass', level: 85 }
  ];

  const experiences = [
    {
      year: '2023 - Present',
      role: 'Full Stack Developer',
      company: 'Tech Solutions Inc.',
      description: 'Building scalable web applications using React, Node.js, and MongoDB.'
    },
    {
      year: '2022 - 2023',
      role: 'Frontend Developer',
      company: 'Digital Agency',
      description: 'Developed responsive user interfaces and improved website performance.'
    }
  ];

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
      className="about-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="about-header" variants={itemVariants}>
        <h1>About Me</h1>
        <p>Passionate developer creating impactful digital experiences</p>
      </motion.div>

      <div className="about-content">
        <motion.div className="about-intro" variants={itemVariants}>
          <h2>Hello, I'm Adarsh</h2>
          <p>
            I'm a passionate full-stack developer with expertise in modern web technologies.
            I love creating elegant solutions to complex problems and bringing ideas to life
            through code. When I'm not coding, you can find me exploring new technologies
            or contributing to open-source projects.
          </p>
        </motion.div>

        <motion.div className="skills-section" variants={itemVariants}>
          <h3>Technical Skills</h3>
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <motion.div 
                key={skill.name} 
                className="skill-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <span>{skill.name}</span>
                <div className="skill-bar">
                  <motion.div 
                    className="skill-progress"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div className="experience-section" variants={itemVariants}>
          <h3>Experience</h3>
          <div className="timeline">
            {experiences.map((exp, index) => (
              <motion.div 
                key={index} 
                className="timeline-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.2 }}
              >
                <div className="timeline-marker">
                  <TrendingUp size={20} />
                </div>
                <div className="timeline-content">
                  <h4>{exp.role}</h4>
                  <p className="company">{exp.company}</p>
                  <p className="year">{exp.year}</p>
                  <p>{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div className="achievements" variants={itemVariants}>
          <h3>Achievements</h3>
          <div className="achievements-grid">
            <motion.div 
              className="achievement-card"
              whileHover={{ scale: 1.05 }}
            >
              <Award size={32} />
              <h4>Best Developer Award</h4>
              <p>Recognized for outstanding contribution to team projects</p>
            </motion.div>
            <motion.div 
              className="achievement-card"
              whileHover={{ scale: 1.05 }}
            >
              <Code size={32} />
              <h4>100+ Projects</h4>
              <p>Successfully delivered numerous web applications</p>
            </motion.div>
            <motion.div 
              className="achievement-card"
              whileHover={{ scale: 1.05 }}
            >
              <Users size={32} />
              <h4>Team Leadership</h4>
              <p>Led development teams and mentored junior developers</p>
            </motion.div>
          </div>
        </motion.div>

        <motion.div className="cta-section" variants={itemVariants}>
          <motion.button 
            className="btn btn-primary"
            onClick={handleDownloadResume}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download size={20} />
            Download Resume
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;
