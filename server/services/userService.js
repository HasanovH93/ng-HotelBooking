const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const JWT_SECRET = "hfsdfsdfsrwq32gdfgdhg";

async function register(username, password) {
  const existing = await User.findOne({ username }).collation({
    locale: "en",
    strength: 2,
  });

  if (existing) {
    throw new Error("Username is taken");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    hashedPassword,
  });
  // TODO see assignment if registration creates user session
  const token = createSession(user);

  return token;
}

async function login(username, password) {
  const user = await User.findOne({ username }).collation({
    locale: "en",
    strength: 2,
  });
  if (!user) {
    throw new Error("Incorrect username or password");
  }
  const hasMatch = await bcrypt.compare(password, user.hashedPassword);

  if (hasMatch == false) {
    throw new Error("Incorrect username or password");
  }
  const token = createSession(user);
  return token;
}

function verifyToken(token) {
  return jwt.verify(token,JWT_SECRET)
}

function createSession({_id, username}) {
  const playload = {
    _id,
    username,
  };
  const token = jwt.sign(playload, JWT_SECRET);
  return token;
}

module.exports = {
  register,
  login,
  verifyToken,
};
