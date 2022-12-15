const { parseToken } = require("../services/user");

module.exports = () => (req, res, next) => {
  if (req.headers["authorization"]) {
    const token = req.headers["authorization"].split(" ")[1];

    if (token) {
      try {
        const payload = parseToken(token);
        req.user = payload;
        req.token = token;
      } catch (error) {
        return res.status(401).json({ message: "Invalid authorization token" });
      }
    }
  }

  next();
};
