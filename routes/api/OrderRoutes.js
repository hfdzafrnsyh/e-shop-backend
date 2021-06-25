const express = require("express");
const router = express.Router();
const cors = require("cors");

const OrderController = require("../../controller/OrderController");
const authJwt = require('../../middleware/jwt');

router.use(authJwt());
router.use(cors());

router.get("/order", OrderController.getOrder);
router.post('/order/add', OrderController.addOrder);
router.get('/order/:id', OrderController.getOrderById);
router.put("/order/:id", OrderController.updateOrder);
router.delete('/order/:id', OrderController.removeOrder);
router.get('/order/get/totalsales', OrderController.getTotalSales);
router.get('/order/get/count', OrderController.getOrderCount);
router.get('/order/userorders/:userId', OrderController.getUserOrder);

module.exports = router;