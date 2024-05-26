require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectdb = require('./config/connectdb')
const payment= require('./routes/payment')
const stripePay= require('./routes/stripePay')
const app = express()


const port = process.env.PORT
const DATABASE_URL=process.env.DATABASE_URL

app.use(cors())

app.use(express.json())

app.use('/razorPay',payment)
app.use('/stripe',stripePay)


app.listen(port, () => {
    connectdb(DATABASE_URL)
    console.log(`Example app listening on port ${port}!`)
})