require("dotenv").config();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const SECRET_PASSWORD = process.env.JWT_SECRET_PASSWORD;

async function getById(id) {
  const user = await User.findById(id);
  return user;
}
async function editUser(userId, username, email, imageUrl) {
  const user = await User.findById(userId);
  user.username = username;
  user.email = email;
  user.imageUrl = imageUrl;
  user.save();
  return user;
}

async function register(email, username, password) {
  const existing = await User.findOne({ email }).collation({
    locale: "en",
    strength: 2,
  });
  if (existing) {
    throw new Error("Email is taken");
  }

  const user = await User.create({
    email,
    username,
    hashedPassword: await bcrypt.hash(password, 10),
  });
  return user;
}
async function login(email, password) {
  const user = await User.findOne({ email }).collation({
    locale: "en",
    strength: 2,
  });
  if (!user) {
    throw new Error("incorrect username or password");
  }

  const match = await bcrypt.compare(password, user.hashedPassword);

  if (!match) {
    throw new Error("incorrect username or password");
  }
  return user;
}

function createToken(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    username: user.username,
    imageUrl: user.imageUrl,
  };
  const token = jwt.sign(payload, SECRET_PASSWORD, {
    expiresIn: "1h",
  });

  return token;
}

function parseToken(token) {
  return jwt.verify(token, SECRET_PASSWORD);
}

module.exports = {
  register,
  login,
  parseToken,
  createToken,
  getById,
  editUser,
};
