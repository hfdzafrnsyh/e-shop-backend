const mongoose = require("mongoose")
require("../database/db")


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true

    },
    passwordHash: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    street: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },

    apartment: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: "default.png"

    },
},
    {
        timestamps: true
    }
)


const User = mongoose.model("Users", UserSchema);

module.exports = User;

