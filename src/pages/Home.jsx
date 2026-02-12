import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Loader from '../components/animations/Loader';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Skills from '../components/sections/Skills';
import Projects from '../components/sections/Projects';
import Contact from '../components/sections/Contact';
import Footer from '../components/layout/Footer';
import './Home.css';

const Home = () => {
  const [showLoader, setShowLoader] = useState(true);

  const handleLoaderComplete = () => {
    // console.log('✅ Loader completed, mounting Personal Assistant');
    setShowLoader(false);
  };

  // Safety fallback: if loader never calls onComplete, force-show content
  useEffect(() => {
    if (!showLoader) return;
    const t = setTimeout(() => {
      // console.warn('⏱️ Loader fallback triggered (5s). Forcing content visible.');
      setShowLoader(false);
    }, 5000);
    return () => clearTimeout(t);
  }, [showLoader]);

  return (
    <>
      <AnimatePresence>
        {showLoader && <Loader key="loader" onComplete={handleLoaderComplete} />}
      </AnimatePresence>

    
      <motion.main
        className="home"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >


        {/* Hero Section */}
        <section id="hero">
          <Hero />
        </section>

        {/* About Section */}
        <section id="about">
          <About />
        </section>

        {/* Skills Section */}
        <section id="skills">
          <Skills />
        </section>

        {/* Projects Section */}
        <section id="projects">
          <Projects />
        </section>

        {/* Contact Section */}
        <section id="contact">
          <Contact />
        </section>

        {/* Footer */}
        <Footer />
      </motion.main>
    </>
  );
};

export default Home;
