const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Must have a name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Must have a name'],
        unique: [true, 'email must be unique'],
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Must have a password'],
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    isAdmin: {
        type: Boolean,
        default: true
    }

})
const User = mongoose.model('User', UserSchema)
module.exports = User