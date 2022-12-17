const Booking = require("../models/Booking");
const User = require("../models/User");

async function createBooking(data,userId) {
    const newReservation = new Booking(data)

    const user = await User.findById(userId);
    const bookings = user.reservations
    bookings.push(newReservation)
    await User.findByIdAndUpdate(userId, { reservations: bookings });
    return await newReservation.save()
  }

  async function getByIdHReservations(id) {
    const user = await User.findById(id).populate("reservations")
    return user;
  }

  module.exports = {
    createBooking,
    getByIdHReservations
  }