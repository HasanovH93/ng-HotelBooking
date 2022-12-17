const {Schema , model, Types} = require('mongoose');

const bookingSchema = new Schema({
    checkIn: {type : String,required: true},
    checkOut: {type : String,required:true},
    guests: {type : Number,required: true},
    user: { type: Types.ObjectId, ref: "User" },
    hotel: { type: {}},
});

const Booking = model("Booking", bookingSchema);

module.exports = Booking;
