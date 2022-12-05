const {Schema, model, Types: {ObjectId}} = require('mongoose');

const hotelSchema = new Schema({
   hotelName: {type: String, required: true, minlength: [3, 'Make must be at least 4 characters long']},
   roomType: {type: String, required: true, minlength: [3, 'Make must be at least 4 characters long']},
   location: {type: String, required: true},
   stars: {type: Number},
   description: {type: String, required: true, minlength: [10, 'Make must be at least 10 characters long']},
   price: {type: Number, required: true, min: [0.01, 'Price must be a positive number']},
   imageUrls: [{type: String, required: [true, 'Img Url is required!']}],
   owner: {type: String}
});

const Hotel = model('hotel', hotelSchema);

module.exports = Hotel;