const axios = require('axios');

// get user repos(private/public with link to clone repo)
const getUserRepos = (req, res) => {
  const githubAccessToken = req.user.githubAccessToken;
  const query = `
  query {
    viewer {
      repositories(first: 50, orderBy:{field: UPDATED_AT, direction:DESC}) {
        nodes {
          name
          url
          isPrivate
        }
      }
    }
  }
`;

  axios.post('https://api.github.com/graphql', { query },
    {
      headers: {
        Authorization: `Bearer ${githubAccessToken}`,
        'User-Agent': 'CodeBarcha',
        'Content-Type': 'application/json'
      }
    })
    .then((resp) => {
      const repos = resp.data.data.viewer.repositories.nodes;
      const reposDetails = repos.map((repo) => ({
        name: repo.name,
        cloneUrl: `${repo.url}.git`,
        visibility: repo.isPrivate ? 'private' : 'public'
      }));
      res.status(200).json(reposDetails);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch user repos from github api' });
    });
};

// search public repos
/*
const cloneRepo = (req, res) => {

};

const createRepo = (req, res) => {

}; */
module.exports = { getUserRepos };
