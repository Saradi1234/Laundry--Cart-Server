const mongoose = require('mongoose')
const Schema = mongoose.Schema()


const ordersListSchema = new Schema({
    orderId: { type: String, required: true },
    orderDateTime: { type: Date, default: new Date() }, // testing
    storeLocation: { type: String, required: true },
    city: { type: String, required: true },
    storePhone: { type: Number, required: true },
    totalItems: { type: Number, required: true },
    price: { type: Number, required: true },
    status: { type: String, default: 'Ready to pickup' },

    user: { type: Schema.Types.ObjectId, ref: 'users' }
})

const ordersListModel = mongoose.model('ordersList', ordersListSchema)

module.exports = ordersListModel