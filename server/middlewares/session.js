const { parseToken } = require("../services/user");

module.exports = () => (req, res, next) => {

  
    const token = req.headers["x-authorization"].split(' ')[1]
    console.log(token)

  if (token) {
    try {
      const payload = parseToken(token);
      req.user = payload;
      req.token = token;
    } catch (error) {
       return res.status(401).json({message: 'Invalid authorization token'})
    }
  }
  next()
};
