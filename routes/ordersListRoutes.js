const express = require('express')
const ordersListModel = require('../Models/ordersListModel')
const router = express.Router()

const secretKey = 'this-is-a-secret-key'

router.post('/ordersList',
    async (req, res) => {
        try {
            const createdOrdersList = await ordersListModel.create({
                prodcust: req.body,
                user: req.user
            })
            // SENDING RESPONSE
            res.status(200).json({
                status: "Orders List created",
                data: createdOrder
            })
        }
        catch (error) {
            res.status(500).json({ error: error.message })
        }

    })


router.get('/ordersList',
    async (req, res) => {
        try {

        }
        catch (error) {
            res.status(500).json({ error: error.message })
        }

    })

module.exports = router