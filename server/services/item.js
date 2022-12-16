const Hotel = require("../models/Hotel");
const User = require("../models/User");

async function getAll(skip, limit) {
  return Hotel.find({}).skip(skip).limit(limit).lean();
}

async function getLastFour() {
  return await Hotel.find({}).populate("owner").sort({ date: -1 }).limit(4).lean();
}

async function getByUserId(userId) {
  return Hotel.find({ owner: userId });
}

async function getHotelById(id) {
  return await Hotel.findById(id).lean();
}

async function create(item) {
  const newHotel = new Hotel(item);
  return await newHotel.save();
}

async function changeImage(id, newImage, newEmail) {
  const existing = await Hotel.findById(id);

  existing.ownerImage = newImage;
  existing.ownerEmail = newEmail;

  return existing.save();
}

async function deleteById(id) {
  const getHotel = await getHotelById(id);
  const result = await Hotel.deleteOne(getHotel);
  return result;
}

async function likeHotel(userId, hotelId) {

  const user = await User.findById(userId);
  let likes = user.likedHotels;
  likes.push(hotelId);
  await User.findByIdAndUpdate(userId, { likedHotels: likes });
  let hotel = await Hotel.findById(hotelId);
  let hotelArr = hotel.likedBy;
  hotelArr.push(userId);
  await Hotel.findByIdAndUpdate(hotelId, { likedBy: hotelArr });
}

async function updateById(id, userId, data) {
  let currentHotel = await Hotel.findById(id);

  if (!currentHotel) {
    throw new Error("Cound not find Hotel in Database");
  }
  if (currentHotel.owner != userId) {
    throw new Error("Not Allowed!");
  }
  currentHotel = Object.assign(currentHotel, data);
  return currentHotel.save();
}

async function getByIdHotels(id) {
  const user = await User.findById(id).populate("likedHotels");
  return user;
}

async function search(query){
  const data = await Hotel.find(query);
  return data;
}

module.exports = {
  getAll,
  getHotelById,
  create,
  getByUserId,
  getLastFour,
  changeImage,
  deleteById,
  likeHotel,
  updateById,
  getByIdHotels,
  search
};
