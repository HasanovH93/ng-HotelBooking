const { hasUser } = require("../middlewares/guards");
const { create, getLastFour, getAll } = require("../services/item");
const { parseError } = require("../util/parser");
const { s3UploadImg } = require("../middlewares/imagesUpload");

const dataController = require("express").Router();

dataController.get("/last-hotels", async (req, res) => {
  const hotels = await getLastFour();
  res.status(200).send({ latestHotels: hotels });
});

dataController.post("/create", s3UploadImg(), async (req, res) => {
  try {
    req.body = JSON.parse(JSON.stringify(req.body));

    req.body.imageUrls = req.files.map((img) => img.location);

    const data = {
      hotelName: req.body.hotelName,
      roomType: req.body.roomType,
      location: req.body.location,
      address: req.body.address,
      stars: Number(req.body.stars),
      description: req.body.description,
      price: Number(req.body.price),
      imageUrls: req.body.imageUrls,
      facilities: req.body.facilities,
    };

    data.date = new Date().toDateString();
    data.owner = req.user._id;

    if (Object.values(data).some((v) => !v)) {
      throw new Error(`All fields are required`);
    }
    if (req.body.imageUrls.length < 1) {
      throw new Error("At least one Image is required!");
    }

    const user = req.user._id;
    const createdData = await create(data);
    console.log(createdData);

    res.status(201).send({
      message: "Successfully uploaded " + req.files.length + " files!",
      createdData,
      user,
    });
  } catch (error) {
    const message = parseError(error);
    res.status(400).json({ message });
  }
});

dataController.get("/all-hotels", async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = 3;
    const skip = parseInt(page * limit);
    const data = await getAll(skip, limit);
    res.json(data);
  } catch (error) {}
});

// dataController.get("/:id", async (req, res) => {
//   const item = await getById(req.params.id);
//   res.json(item);
// });

// dataController.put("/:id", hasUser(), async (req, res) => {
//   const item = await getById(req.params.id);
//   if (req.user._id != item._ownerId) {
//     return res.status(403).json({ message: "You cannot modify this record" });
//   }
//   try {
//     const result = await edit(req.params.id, req.body);
//     res.json(result);
//   } catch (error) {
//     const message = parseError(error);
//     res.status(400).json({ message });
//   }
// });

// dataController.delete("/:id", hasUser(), async (req, res) => {
//   const item = await getById(req.params.id);
//   if (req.user._id != item._ownerId) {
//     return res.status(403).json({ message: "You cannot modify this record" });
//   }

//   try {
//     await deleteItem(item);
//     res.status(204).end();
//   } catch (error) {
//     const message = parseError(error);
//     res.status(400).json({ message });
//   }
// });

module.exports = dataController;
