
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
        res.send('Hello From Api')
    })
    router.get('/', (req, res) => {
        res.send('Hello From root')
    })

}

module.exports = routes;