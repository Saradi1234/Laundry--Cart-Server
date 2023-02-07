const mongoose = require('mongoose')
const Schema = mongoose.Schema


const orderSchema = new Schema({
    orderId: { type: String, required: true },
    orderDateTime: { type: Date, default: new Date() }, // testing
    storeLocation: { type: String, required: true },
    city: { type: String, required: true },
    storePhone: { type: Number, required: true },
    totalItems: { type: Number, required: true },
    price: { type: Number, required: true },
    status: { type: String, default: 'Ready to pickup' },
    products: [
        {
            productType: { type: String, required: true },
            quantity: { type: Number, required: true },
            washType: { type: [String], required: true },
            price: { type: Number, required: true }
        }
    ],
    user: { type: Schema.Types.ObjectId, ref: 'users' }
})

const orderModel = mongoose.model('orders', orderSchema)

module.exports = orderModel