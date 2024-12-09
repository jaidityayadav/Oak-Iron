const express = require("express");
const { placeOrder, getOrders } = require("../controllers/orderController");
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/placeOrder", auth, placeOrder);
router.get("/getOrders", auth, getOrders);

module.exports = router;
