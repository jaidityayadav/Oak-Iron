const userModel = require("../models/userModel");
const itemModel = require("../models/itemModel");

const addToCart = async (req, res) => {
    const { itemId } = req.body;

    if (!itemId) {
        return res.status(400).json({ message: "Invalid item" });
    }

    try {
        const user = await userModel.findById(req.userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const existingItem = user.cart.find((item) => item.itemId.toString() === itemId.toString());

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            user.cart.push({ itemId, quantity: 1 });
        }

        await user.save();

        res.json({
            item: req.body.item,
            itemIdofbackend: itemId,
            success: true,
            message: "Cart updated",
            cart: user.cart,
        });
    } catch (error) {
        console.error("Error adding to cart", error);
        res.status(500).json({ message: "Failed to update cart, please try again" });
    }
};

const removeFromCart = async (req, res) => {
    const { itemId } = req.body;

    if (!itemId) {
        return res.status(400).json({ message: "Invalid item" });
    }

    try {
        const user = await userModel.findById(req.userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const itemIndex = user.cart.findIndex((item) => item.itemId.toString() === itemId.toString());

        if (itemIndex === -1) {
            return res.status(404).json({ message: "Item not found in cart" });
        }

        const existingItem = user.cart[itemIndex];
        existingItem.quantity -= 1;

        if (existingItem.quantity <= 0) {
            user.cart.splice(itemIndex, 1);
        }

        await user.save();

        res.json({ success: true, message: "Cart updated", cart: user.cart });
    } catch (error) {
        console.error("Error removing from cart", error);
        res.status(500).json({ message: "Failed to update cart, please try again" });
    }
};

module.exports = { addToCart, removeFromCart };
