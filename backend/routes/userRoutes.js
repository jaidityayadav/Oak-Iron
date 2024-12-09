const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const resolveItemNameToId = require('../middlewares/resolveItemNametoId');
const userController = require('../controllers/userController');

router.get('/getCartItemCount/:itemName', auth, userController.getCartItemCount);

router.get('/getCartItems', auth, userController.getCartItems);

module.exports = router;