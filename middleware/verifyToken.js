const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  // get cookies from client
  const cookie = req.cookies;

  // check if the cookie is there and by conditional chaining check if the cookie has the access key
  if (!cookie?.access) {
    return res.redirect('/auth/unauthorized');
  } // unauthorized if no cookies

  // get the user name from the URL
  const username = req.params.name;
  // get the accessToken from the cookie
  const accessToken = cookie.access;

  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
    if (err || username !== decode.username) {
      return res.sendStatus(403);
    } // forbiden
    next();
  });
};

module.exports = verifyToken;
