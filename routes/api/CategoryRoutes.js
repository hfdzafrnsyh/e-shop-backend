const express = require("express");
const router = express.Router();
const cors = require("cors")

const authJwt = require('../../middleware/jwt');
const middlewareCategory = require("../../middleware/middlewareCategory");
const CategoryController = require("../../controller/CategoryController")

router.use(cors())
router.use(authJwt());

router.get("/category", CategoryController.getCategory);
router.get("/category/:id", CategoryController.getCategoryById);
router.post("/category/add", ...middlewareCategory, CategoryController.addCategory);
router.put("/category/:id", ...middlewareCategory, CategoryController.updateCategory);
router.delete("/category/:id", CategoryController.removeCategory);
router.get('/category/:id/product', CategoryController.getProductByCategoryId);

module.exports = router;

