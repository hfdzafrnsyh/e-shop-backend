const express = require('express');
const router = express.Router();
const cors = require('cors');

const ProductController = require('../../controller/ProductController');
const authJwt = require('../../middleware/jwt');
const middlewareImage = require('../../middleware/imageHandler');
const middlewareImagesArray = require('../../middleware/imagesArrayHandler');


router.use(authJwt());
router.use(cors());


router.get('/product', ProductController.getProduct);
router.post('/product/add', ...middlewareImage, ProductController.addProduct);
router.get('/product/:id', ProductController.getProductById);
router.put('/product/:id', ...middlewareImage, ProductController.updateProduct);
router.delete('/product/:id', ProductController.removeProduct)
router.get('/product/get/featured/:count', ProductController.getProductByFeatured)
router.put('/product/gallery-images/:id', ...middlewareImagesArray, ProductController.getImageList);

module.exports = router;