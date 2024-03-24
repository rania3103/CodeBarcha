const getGithubInfo = (req, res) => {
  const clientID = process.env.GITHUB_CLIENT_ID;
  const githubUserName = req.user.username;
  const fullUrl = `https://github.com/login/oauth/authorize?client_id=${clientID}&login=${githubUserName}`;
  res.redirect(fullUrl);
};
module.exports = { getGithubInfo };
