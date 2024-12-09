const itemModel = require("../models/itemModel");

const resolveItemNameToId = async (req, res, next) => {
    const { itemName } = req.params;

    // Check if itemName is provided
    if (!itemName) {
        return res.status(400).json({ message: "Item name is required." });
    }

    try {
        // Query the database for the item by name
        const item = await itemModel.findOne({ name: itemName });

        if (!item) {
            return res.status(404).json({ message: "Item not found." });
        }

        // Attach itemId to the request object
        req.body.itemId = item._id;
        req.body.item = item;
        next(); // Pass control to the next middleware or route handler
    } catch (error) {
        console.error("Error resolving item name to ID:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

module.exports = resolveItemNameToId;