const mongoose = require("mongoose");
require('../database/db');


const OrderItemsSchema = new mongoose.Schema({
    quantity: {
        type: Number,
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',

    }
})


const OrderItems = mongoose.model("OrderItems", OrderItemsSchema)

module.exports = OrderItems;