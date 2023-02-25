const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  const accessToken = req.cookies.jwt;

  if (accessToken) {
    jwt.verify(
      accessToken,
      "Basic authentication secret",
      (err, decodedToken) => {
        if (err) {
          console.log(decodedToken);
          res.status(500).json({ error: "Not authenticated, Please login" });
        } else {
          console.log(decodedToken);
          res.status(200).json({ ok: "user is Authenticated" });
        }
      }
    );
  } else {
    res.status(500).json({ error: "Not authenticated, Please login" });
  }
};

const alreadyLoggedIn = (req, res, next) => {
  const accessToken = req.cookies.jwt;

  if (accessToken) {
    jwt.verify(
      accessToken,
      "Basic authentication secret",
      (err, decodedToken) => {
        if (err) {
          console.log(decodedToken);
          next();
        } else {
          console.log(decodedToken);
          res.status(500).json({ error: "Already logged in" });
        }
      }
    );
  } else {
    next();
  }
};
module.exports = { requireAuth, alreadyLoggedIn };
