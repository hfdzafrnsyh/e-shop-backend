const mongoose = require("mongoose");

const uri = process.env.URI;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    dbName: process.env.DB_NAME
})
    .then(() => {
        console.log("MongoDB Connect Successully")
    })
    .catch(err => {
        console.log("MongoDB Error" + err)
    })

