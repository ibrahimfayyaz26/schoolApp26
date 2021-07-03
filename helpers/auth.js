const expressJwt = require("express-jwt");

function auth() {
  const secret = process.env.SECRET;
  return expressJwt({
    secret,
    algorithms: ["HS256"],
  }).unless({
    path: [
      { url: /\/upload(.*)/, method: ["GET", "OPTIONS"] },
      { url: /\/User(.*)/, method: ["POST", "OPTIONS"] },
      { url: /\/Class(.*)/, method: ["POST", "GET", "OPTIONS"] },
    ],
  });
}

module.exports = auth;
