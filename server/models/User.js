const {Schema, model} = require('mongoose');
const { options } = require('../controllers/homeController');

const userSchema = new Schema({
    username: {type: String, required: true, unique: true, minlength: [3, 'Password must be at least 3 characters long']},
    hashedPassword: {type: String , required: true},
});
const User = model("User", userSchema);

userSchema.index({username: 1}, {
    collation: {
        locale: 'en',
        strength: 2
    }
})

module.exports = User