const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cart: [{
        itemId: { type: ObjectId, ref: 'Item' },
        quantity: { type: Number, default: 0 }
    }],
    orders: [{ type: ObjectId, ref: 'Order' }]
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;