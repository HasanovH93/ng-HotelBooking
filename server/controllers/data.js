const { hasUser } = require("../middlewares/guards");
const { create, getLastFour, getAll, getHotelById } = require("../services/item");
const { getById} = require('../services/user')
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

  

    if (Object.values(data).some((v) => !v || v === null)) {
      throw new Error(`All fields are required`);
    }
    if (req.body.imageUrls.length < 1) {
      throw new Error("At least one Image is required!");
    }
    if(req.body.imageUrl.length > 5){
      throw new Error("Maximum images is 5");
    }
    data.date = new Date().toDateString();
    data.owner = req.user._id;

   
    const id = req.user._id;
   const user = await getById(id);
   data.ownerImage = user.imageUrl
   data.ownerEmail = user.email

    const createdData = await create(data);

    res.status(201).send({
      message: "Successfully uploaded " + req.files.length + " files!",
      createdData
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

dataController.get("/details/:id", async (req, res) => {
try {
  const id = req.params.id;
  const data = await getHotelById(id)
  res.status(200).send({data})
} catch (error) {
  const message = parseError(error);
 res.status(400).json({message})
}
});

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
