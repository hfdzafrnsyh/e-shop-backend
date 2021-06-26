const mongoose = require("mongoose");

const uri = process.env.URI;

mongoose.connect(uri || 'mongodb://localhost/db_e-shop', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    dbName: process.env.DB_NAME

})

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB connect Successfully');
});