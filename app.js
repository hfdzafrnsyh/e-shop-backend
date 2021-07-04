const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const morgan = require('morgan');
const errorHandler = require('./middleware/error-handler');
const path = require('path')




// middleware
app.use(cors());
app.options('*', cors());

app.use('/public', express.static(path.join(__dirname, 'public')))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(morgan("tiny"));



require('dotenv').config();

const port = process.env.PORT || 5000

// routes
const routes = require('./routes/routes');
routes(app);
app.use(errorHandler);


app.listen(port, () => {
    console.log(`Server run in port: ${port}`)
})