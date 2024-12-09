const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const orderSchema = new Schema({
    userId: { type: ObjectId, ref: 'User', required: true },
    items: [
        {
            itemId: { type: ObjectId, ref: 'Item', required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true } // Price at the time of purchase
        }
    ],
    totalAmount: { type: Number, required: true },
    address: { type: String, required: true },
    orderDate: { type: Date, default: Date.now }
});

const OrderModel = mongoose.model('Order', orderSchema);

module.exports = OrderModel;