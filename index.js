require('dotenv').config()
const mongoose = require('mongoose')
const app = require('./app')

const port = process.env.PORT || 5050

mongoose.connect(process.env.DATABSE_URL, () => {
    console.log('connected to DB')
    app.listen(port, () => { console.log(`server is live at port :: ${port}`) })
})