const mongoose = require("mongoose");
require('../database/db');


const OrderSchema = new mongoose.Schema({
    orderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderItems',
        required: true
    }],
    shippingAddress1: {
        type: String,
        required: true
    },
    shippingAddress2: {
        type: String
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
    phone: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'Pending'
    },
    totalPrice: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
    },
    dateOrdered: {
        type: Date,
        default: Date.now
    },

})

// menambahkan id dari _id untuk front-end

OrderSchema.virtual('id').get(function () {
    return this._id.toHexString();
})

OrderSchema.set('toJSON', {
    virtuals: true,
})


const Order = mongoose.model("Order", OrderSchema)

module.exports = Order;