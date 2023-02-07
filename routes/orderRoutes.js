const express = require('express')
const orderModel = require('../Models/orderModel')
const router = express.Router()


router.post('/',
    async (req, res) => {
        try {
            console.log(req.body)
            // CREATING ORDER
            const createdOrder = await orderModel.create({
                ...req.body,
                user: req.user
            })
            // SENDING RESPONSE
            res.status(200).json({
                status: "Order created",
                data: createdOrder
            })
        }
        catch (error) {
            res.status(500).json({ error: error.message })
        }

    })


router.get('/',
    async (req, res) => {
        try {
            const ordersList = await orderModel.find({ user: req.user })
            // console.log(ordersList)
            res.status(200).json(ordersList)
        }
        catch (error) {
            res.status(500).json({ error: error.message })
        }

    })


router.delete('/:id',
    async (req, res) => {
        try {
            const order = await orderModel.findOne({ _id: req.params.id })
            if (!order) {
                return res.status(404).json({ message: 'Order doesnt exists.' })
            }
            if (order.user.toString() !== req.user) {
                return res.status(401).json(
                    { message: 'This order item belongs to someone else' })
            }
            await orderModel.deleteOne({ _id: req.params.id })
            res.status(200).json({ message: "Order Deleted Successfully." })
        }
        catch (error) {
            res.status(500).json({ error: error.message })
        }

    })

module.exports = router