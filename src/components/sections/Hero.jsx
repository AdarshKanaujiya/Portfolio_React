import React, { useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./Hero.css";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  useEffect(() => {
    // Parallax effect on scroll
    const ctx = gsap.context(() => {
      gsap.to(".hero-bg-element", {
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom center",
          scrub: 1,
          markers: false,
        },
        y: 100,
        opacity: 0.5,
      });
    });

    return () => ctx.revert();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // setIsMobileMenuOpen(false);
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 0 30px rgba(255, 107, 53, 0.5)",
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <section className="hero-section">
      <div className="hero-bg-element"></div>

      <motion.div
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Heading */}
        <motion.div className="hero-heading">
          <h1 className="hero-title">
            <span className="typewriter heading-line-1 gradient-text">Frontend & Backend</span>
            <span className="typewriter heading-line-2 gradient-text">
              Full Stack Developer
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <div className="hero-subtitle">
          <span className="typewriter subtitle-line-1">
            Crafting premium digital experiences with cutting-edge animations
            and modern design.
          </span>
          
          <span className="typewriter subtitle-line-2">
            Let&apos;s build something extraordinary together.
          </span>
        </div>

        {/* Glassmorphic Card */}
        <motion.div
          variants={itemVariants}
          className="hero-card glass-effect-strong"
        >
          <div className="hero-card-content">
            <div className="hero-stat">
              <span className="stat-number">15+</span>
              <span className="stat-label">Projects Delivered</span>
            </div>
            <div className="divider"></div>
            <div className="hero-stat">
              <span className="stat-number">100%</span>
              <span className="stat-label">Client Satisfaction</span>
            </div>
            <div className="divider"></div>
            <div className="hero-stat">
              <span className="stat-number">1.5+</span>
              <span className="stat-label">Years Experience</span>
            </div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="hero-cta">
          <motion.button
            className="btn btn-primary"
            variants={buttonVariants}
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
            onClick={(e) => handleNavClick(e, '#projects')}
          >
            View My Work
            <svg
              className="btn-arrow"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M5 12h14M12 5l7 7-7 7"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </motion.button>

          <motion.button
            className="btn btn-secondary"
            variants={buttonVariants}
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
            onClick={(e) => handleNavClick(e, '#contact')}
          >
            Get In Touch
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="scroll-indicator"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </motion.div>
    </section>
  );
};

export default Hero;
