const userModel = require("../models/userModel");
const orderModel = require("../models/orderModel");

const placeOrder = async (req, res) => {
    const { address } = req.body;

    if (!address) { return res.status(400).json({ message: "Please enter your address before placing the order." }); }

    try {
        const userId = req.userId;
        const user = await userModel.findById(userId).populate("cart.itemId");

        if (!user || user.cart.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        const orderItems = user.cart.map((cartItem) => ({
            itemId: cartItem.itemId._id,
            quantity: cartItem.quantity,
            price: cartItem.itemId.price,
        }));

        const totalAmount = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

        const newOrder = new orderModel({
            userId: userId,
            items: orderItems,
            totalAmount: totalAmount,
            address: address,
        });

        await newOrder.save();

        user.cart = [];
        user.orders.push(newOrder._id);
        await user.save();

        res.status(201).json({ message: "Order placed successfully", orderId: newOrder._id });
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ message: "Failed to place order" });
    }
};

const getOrders =  async (req, res) => {
    const userId = req.userId; // Assuming user is authenticated and userId is in req.user
    try {
        const orders = await orderModel.find({ userId }).populate('items'); // Populate the items field if needed
        res.json({ orders });
    } catch (error) {
        console.error("Failed to fetch orders", error);
        res.status(500).json({ message: 'Failed to fetch orders' });
    }
};


module.exports = { placeOrder , getOrders };
