const mongoose = require("mongoose");
require('../database/db');


const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    richDescription: {
        type: String,
        default: ""
    },

    image: {
        type: String,
        default: ""
    },

    images: [{
        type: String
    }],

    brand: {
        type: String,
        default: ""
    },

    price: {
        type: Number,
        default: 0
    },

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    numReviews: {
        type: Number,
        required: true,
    },
    countInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    rating: {
        type: mongoose.Schema.Types.Decimal128,
        default: 0
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
},
    {
        timestamps: true
    }
)


// menambahkan id dari _id untuk front-end

ProductSchema.virtual('id').get(function () {
    return this._id.toHexString();
})

ProductSchema.set('toJSON', {
    virtuals: true,
})

const Product = mongoose.model("Products", ProductSchema)

module.exports = Product;