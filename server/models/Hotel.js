const { Schema, model, Types } = require("mongoose");

const hotelSchema = new Schema({
  hotelName: {
    type: String,
    required: true,
    minlength: [3, "Hotel Name must be at least 4 characters long"],
  },
  roomType: { type: String, required: true },
  location: { type: String, required: true },
  address: { type: String, required: true },
  stars: { type: Number, required: true },
  description: {
    type: String,
    required: true,
    minlength: [10, "Description must be at least 10 characters long"],
  },
  price: {
    type: Number,
    required: true,
    min: [0.01, "Price must be a positive number"],
  },
  imageUrls: [
    { type: String, required: [true, "At least one image is required!"] },
  ],
  facilities: [{ type: String, required: [true, "At least one facility is required!"] }],
  date: { type: String },
  owner: { type: Types.ObjectId, ref: "User", required: true },
  likedBy: [{ type: Types.ObjectId, ref: "User" }],
  ownerEmail: { type: String },
  ownerImage: { type: String },
});

const Hotel = model("Hotel", hotelSchema);

module.exports = Hotel;
