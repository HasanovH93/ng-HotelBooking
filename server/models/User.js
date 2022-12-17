const {Schema , model, Types} = require('mongoose');

const userSchema = new Schema({
    email: {type : String, required: true, unique: true},
    username: {type : String, required: true},
    imageUrl: {type: String, default: ''},
    hashedPassword: {type : String, required: true},
    likedHotels: [{type: Types.ObjectId, ref: 'Hotel'}],
    reservations: [{type: Types.ObjectId, ref: 'Booking'}]
});

userSchema.index({ email: 1}, {
    collation: {
        locale: 'en',
        strength: 2
    }
})

const User = new model('User', userSchema);

module.exports = User;