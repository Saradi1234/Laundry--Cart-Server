const express = require('express')
const authorization = require('./auth/auth.js')
const loginRoutes = require('./routes/loginRoutes')
const orderRoutes = require('./routes/orderRoutes')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/order', authorization)


app.use(loginRoutes)
app.use('/order', orderRoutes)


app.get('/', (req, res) => {
    res.send("All Ok.")
})

module.exports = app