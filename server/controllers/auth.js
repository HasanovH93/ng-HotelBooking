const authController = require('express').Router();
const {body, validationResult } = require('express-validator')
const { register,login, logout, createToken } = require('../services/user');
const { parseError } = require('../util/parser');


authController.post('/register', 
body('email').isEmail().withMessage('Invalid Email'),
body('password').isLength({ min: 3}).withMessage('Password must be at least 3 characrers long'),
 async (req, res) => {
 
  try {
    const { errors } = validationResult(req);
    if(errors.length > 0){
        throw errors;
    }
   const user =  await register(req.body.email,req.body.username, req.body.password);
    token = createToken(user)
    const userData = removePassword(user)
    res.json({userData,token, expiresIn: 3600})
  } catch (error) {
    const message = parseError(error)
    res.status(400).json({ message })
  }
});

authController.post('/login', async (req, res) => {
    try {
        const user=  await login(req.body.email, req.body.password);
        const token = createToken(user);
        const userData = removePassword(user)

        console.log('POST')
        res.json({userData, token, expiresIn: 3600})
       } catch (error) {
        const message = parseError(error)
        res.status(401).json({ message })
       }
});

authController.get('/logout', async (req, res) => {
  const token = req.token
  await logout(token);
  res.status(204).end();

})

const removePassword = (data) => {
  const { email, id, username } =
    data;

  const userData = {
    email,
    id,
    username,
  };
  return userData;
};

module.exports = authController