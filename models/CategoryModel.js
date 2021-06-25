const mongoose = require("mongoose");
require('../database/db');


const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    color: {
        type: String,
    },
    icon: {
        type: String,
    }
},
    {
        timestamps: true
    }
)


const Category = mongoose.model("Category", CategorySchema)

module.exports = Category;