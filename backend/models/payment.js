const mongoose = require('mongoose')

// const paymentSchema=new mongoose.Schema({
//     razorpayPaymentId:String,
//     razorpayOrderId:String
// })

// const paymentModel=mongoose.model("paymentRazor",paymentSchema)

// module.exports=paymentModel


// import mongoose from 'mongoose'


const paySchema = new mongoose.Schema({
    razorpayOrderId: { type: String, required: true },
    razorpayPaymentId: { type: String, required: true },
})

const paymentModel = mongoose.model("Razorpay", paySchema)


module.exports=paymentModel