const axios = require('axios');

// get user repos(private/public with link to clone repo)
const getUserRepos = (req, res) => {
  const githubAccessToken = req.user.githubAccessToken;
  const githubUserName = req.user.githubUserName;
  const query = `
  query {
    viewer {
      repositories(first: 50, orderBy:{field: UPDATED_AT, direction:DESC}) {
        nodes {
          name
          url
          isPrivate
          description
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
        userName: githubUserName,
        name: repo.name,
        repoUrl: repo.url,
        cloneUrl: `${repo.url}.git`,
        visibility: repo.isPrivate ? 'Private' : 'Public',
        description: repo.description
      }));
      res.status(200).json(reposDetails);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch user repos from github api' });
    });
};

// create repo
const createRepo = (req, res) => {
  const githubAccessToken = req.user.githubAccessToken;
  const data = {
    name: req.body.name,
    private: req.body.private,
    auto_init: true,
    readme_template: 'default'

  };
  axios.post('https://api.github.com/user/repos', data,
    {
      headers: {
        Authorization: `Bearer ${githubAccessToken}`,
        Content_Type: 'application/json'
      }
    })
    .then((result) => {
      res.status(201).json({ message: 'repository created sucessefully' });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'failed to create repository on github' });
    });
};
module.exports = { getUserRepos, createRepo };
