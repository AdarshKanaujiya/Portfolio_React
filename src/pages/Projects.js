import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Star, GitFork, Calendar, Search, Code, Database, Cloud } from 'lucide-react';
import { githubService } from '../services/githubService';

const Projects = () => {
  const [repos, setRepos] = useState([]);
  const [localProjects, setLocalProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchUsername, setSearchUsername] = useState('');
  const [currentUsername, setCurrentUsername] = useState('AdarshKanaujiya');

  // Local projects data
  const localProjectsData = [
    {
      id: 'local-1',
      name: 'GitHub Dashboard',
      description: 'A React component that fetches and displays GitHub user profiles and repositories with a clean interface.',
      technologies: ['React', 'JavaScript', 'GitHub API'],
      githubUrl: null,
      demoUrl: null,
      isLocal: true,
      icon: <Github size={20} />,
      category: 'Web Development'
    },
    {
      id: 'local-2',
      name: 'Todo App',
      description: 'A simple and intuitive todo application built with React for managing daily tasks and reminders.',
      technologies: ['React', 'JavaScript', 'Local Storage'],
      githubUrl: null,
      demoUrl: null,
      isLocal: true,
      icon: <Code size={20} />,
      category: 'Web Development'
    },
    {
      id: 'local-3',
      name: 'Weather App',
      description: 'A weather application that fetches real-time weather data using OpenWeather API with a responsive design.',
      technologies: ['React', 'JavaScript', 'OpenWeather API'],
      githubUrl: null,
      demoUrl: null,
      isLocal: true,
      icon: <Cloud size={20} />,
      category: 'Web Development'
    }
  ];

  useEffect(() => {
    fetchRepositories();
    setLocalProjects(localProjectsData);
  }, []);

  const fetchRepositories = async (username = currentUsername) => {
    try {
      setLoading(true);
      const data = await githubService.getRepositories(username);
      setRepos(data);
      setCurrentUsername(username);
    } catch (err) {
      setError('Failed to fetch repositories');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchUsername.trim()) return;
    
    try {
      setLoading(true);
      await fetchRepositories(searchUsername);
      setSearchUsername('');
    } catch (err) {
      setError('User not found or failed to fetch repositories');
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const allProjects = [...localProjects, ...repos];

  if (loading) {
    return (
      <div className="projects-container">
        <div className="loading-state">
          <motion.div 
            className="spinner"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p>Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="projects-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="projects-header" variants={cardVariants}>
        <h1>My Projects</h1>
        <p>Explore my recent work, local projects, and open-source contributions</p>
      </motion.div>

      {/* Search Section */}
      <motion.div className="search-section" variants={cardVariants}>
        <div className="search-container">
          <div className="search-input-group">
            <input
              type="text"
              placeholder="Search GitHub user (e.g., facebook, google, microsoft)"
              value={searchUsername}
              onChange={(e) => setSearchUsername(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="search-input"
            />
            <button 
              onClick={handleSearch}
              className="btn btn-primary search-btn"
              disabled={!searchUsername.trim()}
            >
              <Search size={16} />
              Search
            </button>
          </div>
          {currentUsername !== 'AdarshKanaujiya' && (
            <button 
              onClick={() => fetchRepositories('AdarshKanaujiya')}
              className="btn btn-secondary"
            >
              Back to My Projects
            </button>
          )}
        </div>
        {currentUsername !== 'AdarshKanaujiya' && (
          <p className="current-user">Showing projects for: <strong>{currentUsername}</strong></p>
        )}
      </motion.div>

      {error && (
        <motion.div className="error-state" variants={cardVariants}>
          <h2>Error Loading Projects</h2>
          <p>{error}</p>
          <button onClick={() => fetchRepositories()} className="btn btn-primary">
            Try Again
          </button>
        </motion.div>
      )}

      <motion.div className="projects-grid" variants={containerVariants}>
        {allProjects.map((project) => (
          <motion.div
            key={project.id}
            className={`project-card ${project.isLocal ? 'local-project' : ''}`}
            variants={cardVariants}
            whileHover={{ 
              y: -10,
              rotateX: 5,
              rotateY: -5,
              transition: { duration: 0.3 }
            }}
          >
            <div className="project-content">
              <div className="project-header">
                <div className="project-title-section">
                  {project.isLocal && (
                    <div className="local-badge">
                      {project.icon}
                    </div>
                  )}
                  <h3>{project.name}</h3>
                </div>
                {!project.isLocal && (
                  <div className="project-stats">
                    <span className="stat">
                      <Star size={16} />
                      {project.stargazers_count}
                    </span>
                  </div>
                )}
              </div>
              
              <p className="project-description">{project.description}</p>
              
              <div className="project-details">
                {project.isLocal ? (
                  <div className="local-technologies">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="tech-badge">
                        {tech}
                      </span>
                    ))}
                  </div>
                ) : (
                  <>
                    {project.language && (
                      <span className="language-badge">{project.language}</span>
                    )}
                    
                    <div className="project-topics">
                      {project.topics && project.topics.slice(0, 3).map((topic) => (
                        <span key={topic} className="topic-badge">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>
              
              <div className="project-footer">
                {project.isLocal ? (
                  <span className="local-project-info">
                    <Code size={14} />
                    Local Project
                  </span>
                ) : (
                  <span className="updated-date">
                    <Calendar size={14} />
                    Updated {formatDate(project.updated_at)}
                  </span>
                )}
                
                <div className="project-actions">
                  {project.githubUrl && (
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github size={16} />
                      View Code
                    </motion.a>
                  )}
                  
                  {project.homepage && (
                    <motion.a
                      href={project.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </motion.a>
                  )}

                  {project.isLocal && (
                    <span className="local-project-note">
                      Available in portfolio
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Projects;
