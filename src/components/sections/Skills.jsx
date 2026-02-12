import React from 'react';
import { motion } from 'framer-motion';
import './Skills.css';
// import gsap from 'gsap';
// import ScrollTrigger from 'gsap/ScrollTrigger';
// gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
    // const containerRef = useRef(null);
  const skills = [
    { category: 'Frontend', items: ['React', 'TypeScript', 'Next.js', 'Framer Motion'] },
    { category: 'Styling', items: ['Tailwind CSS', 'CSS3', 'GSAP', 'Sass'] },
    { category: 'Tools', items: ['Git', 'Webpack', 'Vite', 'Docker'] },
    { category: 'Animation', items: ['GSAP', 'ScrollTrigger', 'Three.js', 'Canvas'] },
  ];

  // GSAP scroll animations removed to prevent conflict with Framer Motion
  // useEffect(() => {
  //   const ctx = gsap.context(() => {
  //     const cards = gsap.utils.toArray('.skill-card');
  //     cards.forEach((card, index) => {
  //       gsap.to(card, {
  //         scrollTrigger: {
  //           trigger: card,
  //           start: 'top 80%',
  //           end: 'top 20%',
  //           scrub: 1,
  //           markers: false,
  //         },
  //         opacity: 1,
  //         y: 0,
  //         duration: 0.6,
  //       });
  //     });
  //   }, containerRef);

  //   return () => ctx.revert();
  // }, []);
  // Framer Motion whileInView handles all scroll animations

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  const skillVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
      },
    }),
  };

  return (
    <section className="skills-section">    {/* ref={containerRef} */}
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Skills & Expertise</h2>
          <p className="section-subtitle">
            Crafted through years of hands-on experience and continuous learning
          </p>
        </motion.div>

        <motion.div
          className="skills-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {skills.map((skillGroup, groupIndex) => (
            <motion.div
              key={groupIndex}
              className="skill-card glass-effect-strong"
              variants={cardVariants}
              whileHover={{
                y: -10,
                boxShadow: '0 30px 60px rgba(255, 107, 53, 0.1)',
              }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="skill-category">{skillGroup.category}</h3>
              <ul className="skill-items">
                {skillGroup.items.map((skill, itemIndex) => (
                  <motion.li
                    key={itemIndex}
                    className="skill-item"
                    variants={skillVariants}
                    custom={itemIndex}
                  >
                    <span className="skill-dot"></span>
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
