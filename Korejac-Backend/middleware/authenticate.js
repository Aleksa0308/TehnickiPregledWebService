const jwt = require("jsonwebtoken");

const authToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.redirect(302, "/");
  tok = token.split('=')
  jwt.verify(tok[1], process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.redirect(302, "/");

    next();
  });
};

const authAdmin = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.redirect(302, "/");
    tok = token.split('=')
  jwt.verify(tok[1], process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.redirect(302, "/");

    if (user.role == "admin") {
      next();
    } else {
      res.redirect(302, "/");
    }
  });
};

module.exports = {
  authAdmin,
  authToken,
};
