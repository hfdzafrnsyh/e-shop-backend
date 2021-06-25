const express = require("express");
const router = express.Router();
const cors = require("cors")

const authJwt = require('../../middleware/jwt');
const CategoryController = require("../../controller/CategoryController")

router.use(cors())
router.use(authJwt());

router.get("/category", CategoryController.getCategory);
router.get("/category/:id", CategoryController.getCategoryById);
router.post("/category/add", CategoryController.addCategory);
router.put("/category/:id", CategoryController.updateCategory);
router.delete("/category/:id", CategoryController.removeCategory);

module.exports = router;

