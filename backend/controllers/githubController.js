const axios = require('axios');

const getUserRepos = (req, res) => {
  const githubUserName = req.user.githubUserName;
  axios.get(`https://api.github.com/users/${githubUserName}/repos?sort=updated`)
    .then((resp) => {
      const repos = resp.data;
      res.status(200).json(repos);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch user repos from github api' });
    });
};
/*
const cloneRepo = (req, res) => {

};

const createRepo = (req, res) => {

}; */
module.exports = { getUserRepos };
