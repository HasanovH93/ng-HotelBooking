const {Schema, model, Types} = require('mongoose');

const hotelSchema = new Schema({
   hotelName: {type: String, required: true, minlength: [3, 'Hotel Name must be at least 4 characters long']},
   roomType: {type: String, required: true, },
   location: {type: String, required: true},
   stars: {type: Number,required:true},
   description: {type: String, required: true, minlength: [10, 'Description must be at least 10 characters long']},
   price: {type: Number, required: true, min: [0.01, 'Price must be a positive number']},
   imageUrls: [{type: String, required: [true, 'Img Url is required!']}],
   owner: {type: String}
});

const Hotel = model('hotel', hotelSchema);

module.exports = Hotel;