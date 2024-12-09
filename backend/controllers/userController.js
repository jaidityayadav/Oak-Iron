const userModel = require("../models/userModel");
const itemModel = require("../models/itemModel");

const getCartItemCount = async (req, res) => {
    const { itemName } = req.params;

    if (!itemName) {
        return res.status(400).json({ message: "Item name is required." });
    }

    try {
        const foundItem = await itemModel.findOne({ name: itemName });

        if (!foundItem) {
            return res.status(404).json({ message: "Item not found." });
        }

        const itemId = foundItem._id;
        const user = await userModel.findById(req.userId).populate('cart.itemId');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const item = user.cart.find(cartItem => cartItem.itemId._id.toString() === itemId.toString());

        if (!item) {
            return res.status(200).json({ itemCount: 0 });
        }

        res.json({ itemCount: item.quantity });
    } catch (error) {
        console.error('Error fetching cart item count:', error);
        res.status(500).json({
            error: error.message,
            message: 'Error fetching cart item count'
        });
    }
};

const getCartItems = async (req, res) => {
    try {
        const user = await userModel.findById(req.userId).populate('cart.itemId');

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ success: true, cartItems: user.cart });
    } catch (error) {
        console.error("Error retrieving cart items", error);
        res.status(500).json({ message: "Failed to retrieve cart items, please try again" });
    }
};

module.exports = {
    getCartItemCount,
    getCartItems
};