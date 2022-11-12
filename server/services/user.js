const bcrypt = require('bcrypt');
const User = require("../models/User");
const jwt = require('jsonwebtoken');

const SECRET_PASSWORD = 'ljgfgjkhdghd123';

const tokenBlackList = new Set();

async function register(email,password){

    const existing = await User.findOne({email}).collation({ locale: 'en', strength: 2 });
    if(existing){
        throw new Error('Email is taken');
    }


   const user = await User.create({
        email,
        hashedPassword: await bcrypt.hash(password, 10)
    });
    return createToken(user)
}
async function login(email,password){

    const user = await User.findOne({email}).collation({ locale: 'en', strength: 2 });
    if(!user){
        throw new Error('incorrect username or password');
    }

    const match = await bcrypt.compare(password, user.hashedPassword);

    if(!match){
        throw new Error('incorrect username or password');
    }
    return createToken(user)
}
async function logout(token){
    tokenBlackList.add(token);
}

function createToken(user){
    const payload = {
        _id: user._id,
        email: user.email
    }

    return {
        _id: user._id,
        email: user.email,
        accessToken: jwt.sign(payload, SECRET_PASSWORD)
    }
    
    
}

function parseToken(token){
   if(tokenBlackList.has(token)){
    throw new Error('Token is blacklisted')
   }

   return jwt.verify(token,SECRET_PASSWORD)
}


module.exports = {
    register,
    login,
    logout,
    parseToken
}