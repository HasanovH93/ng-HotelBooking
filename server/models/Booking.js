const {Schema , model, Types} = require('mongoose');

const bookingSchema = new Schema({
    checkIn: {type : String},
    checkOut: {type : String},
    guests: {type : Number},
    user: { type: Types.ObjectId, ref: "User" },
    hotel: { type: {}},
});

const Booking = model("Booking", bookingSchema);

module.exports = Booking;
