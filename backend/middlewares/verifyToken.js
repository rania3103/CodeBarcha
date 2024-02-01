const jwt = require('jsonwebtoken');
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ error: 'unauthorized no token provided' });
  }
  const tokenWithoutBearer = token.split(' ')[1];
  jwt.verify(tokenWithoutBearer, process.env.SECRET_KEY, (err, decodedToken) => {
    if (err) {
      console.error(err);
      return res.status(401).json({ error: 'unauthorized invalid token' });
    }
    req.user = decodedToken;
    next();
  });
};
module.exports = verifyToken;
