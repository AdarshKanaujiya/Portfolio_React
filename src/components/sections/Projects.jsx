import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ProjectModal from "../modals/ProjectModal";
import { githubService } from "../../services/githubService";
import "./Projects.css";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [githubProjects, setGithubProjects] = useState([]);
  const [loadingGithub, setLoadingGithub] = useState(false);
  const containerRef = useRef(null);

  // Fetch GitHub projects on mount
  useEffect(() => {
    const fetchGithubProjects = async () => {
      try {
        // console.log("🔄 Fetching GitHub projects...");
        setLoadingGithub(true);
        const repos = await githubService.getRepositories();
        // console.log(`✅ Fetched ${repos.length} repositories from GitHub`);

        // Only include repos that have a homepage (deployed link)
        const formattedProjects = repos
          .filter(
            (repo) =>
              repo.homepage &&
              repo.homepage.trim() !== "" &&
              repo.stargazers_count > 0, // ⭐ only starred projects
          )
          .map((repo) => ({
            id: repo.id,
            title: repo.name,
            description: repo.description,
            image: `https://opengraph.githubassets.com/1/${repo.html_url.replace("https://github.com/", "")}`,
            tech: [repo.language, ...(repo.topics || []).slice(0, 3)].filter(
              Boolean,
            ),
            live: repo.homepage,
            github: repo.html_url,
            color: "rgb(255, 107, 53)",
            stars: repo.stargazers_count,
          }));

        // console.log("📦 Using GitHub projects for display:", formattedProjects);
        setGithubProjects(formattedProjects);
      } catch (error) {
        console.error("❌ Failed to fetch GitHub projects:", error);
      } finally {
        setLoadingGithub(false);
      }
    };

    fetchGithubProjects();
  }, []);

  // Hardcoded fallback projects (filtered for deployed ones)
  const localProjects = [
    {
      id: 1,
      title: "DigiKrishi Officer",
      description:
        "A modern official digital krishi officer which can predict the symptoms disease of the plant with the help of trained ai modal.",
      image:
        "https://officialdigitalkrishi.netlify.app/",
      tech: ["React", "Node.js", "MongoDB"],
      live: "https://officialdigitalkrishi.netlify.app/", // Change this to a real deployed link to test
      github: "https://github.com/AdarshKanaujiya/AlgoMantra---krishi",
      color: "rgb(255, 107, 53)",
    },
    {
      id: 2,
      title: "Analytics Dashboard",
      description: "Real-time analytics dashboard with interactive charts.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      tech: ["React", "D3.js", "TypeScript"],
      live: "https://example.com", // Change this to a real deployed link to test
      github: "https://github.com",
      color: "rgb(100, 200, 255)",
    },
    // Removed projects without live links
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".project-card");
      cards.forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            markers: false,
          },
          opacity: 0,
          y: 50,
          duration: 0.6,
          delay: index * 0.1,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [githubProjects]);

  // Logic: Use GitHub projects if loaded, otherwise fallback.
  // Filter ensures we ONLY show projects that have a 'live' link.
  const displayProjects = [...localProjects, ...githubProjects].filter(
    (project) =>
      project.live &&
      project.live.trim() !== "" &&
      project.live !== "https://example.com",
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <>
      <section className="projects-section" ref={containerRef}>
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Started Projects</h2>
            <p className="section-subtitle">
              Live deployed projects showcasing my work
            </p>
            {loadingGithub && (
              <p className="loading-text">Loading GitHub projects...</p>
            )}
            {!loadingGithub && displayProjects.length === 0 && (
              <p className="loading-text">No deployed projects found.</p>
            )}
          </motion.div>

          <motion.div
            className="projects-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {displayProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="project-card"
                variants={cardVariants}
                onClick={() => setSelectedProject(project)}
              >
                <div className="project-image-wrapper">
                  {/* Static Fallback Image */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="project-image"
                  />

                  {/* Hover Overlay with Live Preview */}
                  <div className="project-overlay">
                    {project.live && (
                      <div className="project-preview">
                        {/* 
                           The iframe loads the actual website. 
                           Note: Some sites block this (X-Frame-Options).
                           pointer-events: none prevents scrolling the iframe so you can click the card.
                        */}
                        <iframe
                          src={project.live}
                          title={`${project.title} preview`}
                          loading="lazy"
                          frameBorder="0"
                          sandbox="allow-scripts allow-same-origin"
                        />
                      </div>
                    )}

                    {/* Text content sits ON TOP of the iframe preview */}
                    <div className="overlay-content glass-effect-strong">
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                      <div className="overlay-actions">
                        <span className="hover-hint">Hover to preview</span>
                        <button className="overlay-btn">View Details</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="project-info">
                  <h3 className="project-title">{project.title}</h3>
                  <div className="project-tech">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="project-links">
                    <motion.a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                      whileHover={{ x: 5 }}
                      onClick={(e) => e.stopPropagation()} // Prevent modal opening when clicking link
                    >
                      Live Demo
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          d="M7 17L17 7M17 7H7M17 7v10"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </motion.a>
                    {project.github && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                        whileHover={{ x: 5 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        GitHub
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Projects;
