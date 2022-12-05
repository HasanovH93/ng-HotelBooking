const authController = require('express').Router();
const {body, validationResult } = require('express-validator')
const { register,login, logout, createToken, getById, editUser } = require('../services/user');
const { parseError } = require('../util/parser');
const { s3UploadImg } = require('../middlewares/imagesUpload');


authController.post('/register', 
body('email').isEmail().withMessage('Invalid Email'),
body('password').isLength({ min: 3}).withMessage('Password must be at least 6 characters long'),
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



authController.post('/login',  async (req, res) => {
    try {
        const user =  await login(req.body.email, req.body.password);
        const token = createToken(user);
        const userData = removePassword(user)

        console.log(userData)
        res.json({userData, token, expiresIn: 3600})
       } catch (error) {
        const message = parseError(error)
        res.status(401).json({ message })
       }
});

authController.get('/profile',  async (req, res) => {
  try {
    // console.log("GET")
    console.log(req)
    const id = req.user._id;
    // console.log(id)
    const user = await getById(id);
    // console.log(user)
    const userData = removePassword(user);
    res.status(200).send({userData})
  } catch (error) {
    res.status(401).send({message: error.message})
  }
})
authController.put('/profile',  s3UploadImg(), async (req, res) => {
  
  try {
    const { username, email } = req.body;
   if(req.files.length > 0){
    req.body.imageUrl = req.files[0].location
   }else if(req.body.img && req.files.length <= 0) {
     req.body.imageUrl = req.body.img
   }
    console.log(req.body.imageUrl)
   const user = await editUser(
    req.user._id,
    username,
    email,
    req.body.imageUrl
   );
   console.log(user)
   const token = createToken(user);
   const userData = removePassword(user)
    console.log(userData)
   res.status(201).send({  userData, token, expiresIn: 3600 });

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
})

authController.get('/logout', async (req, res) => {
  const token = req.token
  await logout(token);
  res.status(204).end();

})

const removePassword = (data) => {
  const { email, id, username, imageUrl } =
    data;

  const userData = {
    email,
    id,
    username,
    imageUrl,
  };
  return userData;
};

module.exports = authController