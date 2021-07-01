const express = require('express');
const router = express.Router();
const cors = require('cors');

const UserController = require('../../controller/UserController');
const authJwt = require('../../middleware/jwt');

router.use(cors());
router.use(authJwt());

router.get('/user', UserController.getUserList);
router.get('/user/get/count', UserController.userCount);
router.get('/user/:id', UserController.detailUser);
router.post('/register', UserController.registerUser);
router.post('/login', UserController.login);
router.delete('/user/:id', UserController.removeUser);

module.exports = router;