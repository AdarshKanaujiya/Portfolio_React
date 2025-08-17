import axios from 'axios';

const GITHUB_API_BASE = 'https://api.github.com';
const DEFAULT_USERNAME = 'AdarshKanaujiya'; // Your default username

export const githubService = {
  async getRepositories(username = DEFAULT_USERNAME) {
    try {
      const response = await axios.get(
        `${GITHUB_API_BASE}/users/${username}/repos`,
        {
          params: {
            sort: 'updated',
            per_page: 12
          }
        }
      );
      
      return response.data.map(repo => ({
        id: repo.id,
        name: repo.name,
        description: repo.description || 'No description available',
        html_url: repo.html_url,
        homepage: repo.homepage,
        stargazers_count: repo.stargazers_count,
        language: repo.language,
        updated_at: repo.updated_at,
        topics: repo.topics || []
      }));
    } catch (error) {
      console.error('Error fetching repositories:', error);
      throw error;
    }
  },

  async getUserInfo(username = DEFAULT_USERNAME) {
    try {
      const response = await axios.get(`${GITHUB_API_BASE}/users/${username}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user info:', error);
      throw error;
    }
  },

  // Method to search for any GitHub user
  async searchUser(username) {
    try {
      const response = await axios.get(`${GITHUB_API_BASE}/users/${username}`);
      return response.data;
    } catch (error) {
      console.error('Error searching user:', error);
      throw error;
    }
  }
};
