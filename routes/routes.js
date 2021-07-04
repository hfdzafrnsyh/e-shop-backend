
'use-strict';

const users = require('./api/UserRoutes');
const product = require('./api/ProductRoutes');
const category = require("./api/CategoryRoutes");
const order = require("./api/OrderRoutes");


const routes = (router) => {


    router.use('/api', users);
    router.use("/api", order);
    router.use("/api", category);
    router.use("/api", product);


    router.get('/api', (req, res) => {
        res.send(`<p align=center>
        
        Hello from Api , Please Login for get data or test get <br> <a href=" https://e-shop-nodes.herokuapp.com/api/product">https://e-shop-nodes.herokuapp.com/api/product</a>
                </p>`)
    })


    router.get('/', (req, res) => {
        res.send('Hello from root')
    })


}

module.exports = routes;