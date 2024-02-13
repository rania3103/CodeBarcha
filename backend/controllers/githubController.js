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
        repoUrl: repo.url,
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

// create repo
const createRepo = (req, res) => {
  const githubAccessToken = req.user.githubAccessToken;
  const data = {
    name: req.body.name,
    private: req.body.private
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

// search any repo
const searchRepo = (req, res) => {
  const githubAccessToken = req.user.githubAccessToken;
  const keyword = req.params.keyword;
  // encode the keyword so if there is any special character it will be encoded to use it in the url (space %20)
  axios.get(`https://api.github.com/search/repositories?q=${encodeURIComponent(keyword)}`,
    {
      headers: {
        Authorization: `Bearer ${githubAccessToken}`,
        'User-Agent': 'CodeBarcha',
        'Content-Type': 'application/json'
      }
    })
    .then((resp) => {
      const repos = resp.data.items;
      const reposDetails = repos.map((repo) => ({
        name: repo.name,
        repoUrl: repo.url,
        cloneUrl: `${repo.url}.git`,
        visibility: repo.isPrivate ? 'private' : 'public',
        owner: repo.owner.login
      }));
      res.status(200).json(reposDetails);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch user repos from github api' });
    });
};
module.exports = { getUserRepos, createRepo, searchRepo };
