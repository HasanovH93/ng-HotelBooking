const authController = require("express").Router();
const { body, validationResult } = require("express-validator");
const {
  register,
  login,
  createToken,
  getById,
  editUser,
} = require("../services/user");
const { parseError } = require("../util/parser");
const { s3UploadImg } = require("../middlewares/imagesUpload");
const { getByUserId, changeImage } = require("../services/item");
const { hasUser } = require("../middlewares/guards");

authController.post(
  "/register",
  body("email").isEmail().withMessage("Invalid Email"),
  body("password")
    .isLength({ min: 3 })
    .withMessage("Password must be at least 6 characters long"),
  async (req, res) => {
    try {
      if (req.body.password != req.body.rePass) {
        throw new Error("Passwords don't match!");
      }
      const { errors } = validationResult(req);
      if (errors.length > 0) {
        throw errors;
      }
      const user = await register(
        req.body.email,
        req.body.username,
        req.body.password
      );
      token = createToken(user);
      const userData = removePassword(user);
      res.json({ userData, token, expiresIn: 3600 });
    } catch (error) {
      const message = parseError(error);
      res.status(400).json({ message });
    }
  }
);

authController.post("/login", async (req, res) => {
  try {
    const user = await login(req.body.email, req.body.password);
    const token = createToken(user);
    const userData = removePassword(user);

    res.json({ userData, token, expiresIn: 3600 });
  } catch (error) {
    const message = parseError(error);
    res.status(401).json({ message });
  }
});

authController.get("/profile", hasUser(), async (req, res) => {
  try {
    const id = req.user._id;
    const user = await getById(id);
    const userData = removePassword(user);
    res.status(200).send({ userData });
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
});
authController.put("/profile", s3UploadImg(),hasUser(), async (req, res) => {
  try {
    const { username, email } = req.body;
    if (req.files.length > 0) {
      req.body.imageUrl = req.files[0].location;
    } else if (req.body.img && req.files.length <= 0) {
      req.body.imageUrl = req.body.img;
    }

    const imageUrl = req.body.imageUrl;

    const user = await editUser(req.user._id, username, email, imageUrl);
    const token = createToken(user);
    const userData = removePassword(user);

    const hotels = await getByUserId(req.user._id);

    for (let hotel of hotels) {
      await changeImage(hotel._id, userData.imageUrl, userData.email);
    }

    res.status(201).send({ userData, token, expiresIn: 3600 });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

const removePassword = (data) => {
  const { email, id, username, imageUrl, likedHotels } = data;

  const userData = {
    email,
    id,
    username,
    imageUrl,
    likedHotels,
  };
  return userData;
};

module.exports = authController;
