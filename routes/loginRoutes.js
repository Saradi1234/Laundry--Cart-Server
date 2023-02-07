const express = require('express')
const userModel = require('../Models/userModel')
const bcrypt = require('bcrypt')
const { body, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const router = express.Router()

const secretKey = 'this-is-a-secret-key'

router.post('/register',
    body('name').isString(),
    body('email').isEmail(),
    body('phoneNo').isNumeric().isLength({ min: 10, max: 10 }),
    body('state').isString(),
    body('district').isString(),
    body('address').isString(),
    body('pincode').isNumeric(),
    body('password').isLength({ min: 1, max: 24 }),
    async (req, res) => {
        try {
            console.log(req.body)
            // CHECKING FOR ANY VALIDATION ERRORS
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() })
            }
            // DESTRUCTURING THE BODY
            const { name, email, phoneNo, state,
                district, address, pincode, password } = req.body
            // if (!name || !email || !phoneNo ||
            //     !state || !district || !address ||
            //     !pincode || !password) {
            //     return res.status(400).json({ message: 'All fields are mandatory.' })
            // }
            
            // CHECKING USER ALREADY EXITS OR NOT
            const user = await userModel.findOne({
                $or: [{ email: email }, { phoneNo: phoneNo }]
            })
            if (user) {
                return res.status(400).json({
                    message: 'email / phone number already exists'
                })
            }
            // HASHING THE PASSWORD
            bcrypt.hash(password, 10, async (err, hashedPassword) => {
                if (err) {
                    return res.status(500).json({ error: err.message })
                }
                // CREATING USER
                const newUser = await userModel.create({
                    name, email, phoneNo, state, district, address, pincode,
                    password: hashedPassword
                })
                // SENDING USER INFO AS RESPONSE
                return res.status(200).json({
                    status: 'Success',
                    data: newUser
                })

            })
        }
        catch (error) {
            res.status(500).json({ error: error.message })
        }

    })


router.post('/login', async (req, res) => {
    try {
        const { phoneOrEmail, password } = req.body
        // console.log(phoneOrEmail, password)
        let user;
        if (typeof phoneOrEmail === Number) {
            user = await userModel.findOne({ phoneNo: phoneOrEmail })
        }
        else {
            user = await userModel.findOne({ email: phoneOrEmail })
        }

        if (!user) {
            return res.status(404).json({ message: "Invalid Credentials" })
        }
        
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                return res.status(500).json({ message: err.message })
            }
            if (result) {
                const token = jwt.sign(
                    { data: user._id },
                    secretKey,
                    { expiresIn: '1h' }
                )
                res.status(200).json({
                    status: 'Success',
                    token
                })
            }
            else {
                res.status(401).json({ message: "Invalid Credentials" })
            }
        })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router