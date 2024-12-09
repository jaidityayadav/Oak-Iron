const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: String,
    specification: {
        weight: { type: Number },
        quantity: { type: Number, default: 0 },
        dimensions: { type: String },
    },
    price: { type: Number, required: true },
    imageUrl: String
});

const ItemModel = mongoose.model('Item', itemSchema)

module.exports = ItemModel;