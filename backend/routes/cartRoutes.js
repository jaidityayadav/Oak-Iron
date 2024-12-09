const express = require("express");
const { addToCart, removeFromCart } = require("../controllers/cartController");
const auth = require("../middlewares/auth");
const resolveItemNameToId = require("../middlewares/resolveItemNametoId");

const router = express.Router();

router.post("/addToCart/:itemName", auth, resolveItemNameToId, addToCart);
router.post("/removeFromCart/:itemName", auth, resolveItemNameToId, removeFromCart);

module.exports = router;
