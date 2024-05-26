const Razorpay = require('razorpay');
const paymentModel = require('../models/payment');

const { RAZORPAY_ID_KEY, RAZORPAY_SECRET_KEY } = process.env;
const razorpayInstance = new Razorpay({
    key_id: RAZORPAY_ID_KEY,
    key_secret: RAZORPAY_SECRET_KEY
});

const createOrd = async (req, res) => {
    try {
        const { amount } = req.body
        if (amount) {
            const options = {
                amount: amount,
                currency: "INR",
                receipt: "jhkachhadiya@gmail.com"
            }
            const order = await razorpayInstance.orders.create(options)
            res.json({
                status: 200,
                message: "order created successfully",
                order
            })
        } else {
            res.json({
                status: 400,
                message: "all field are required",
                order
            })
        }
    } catch (error) {
        console.log(error)
        res.json({
            status: 500,
            message: "internal server error",
        })
    }
}

const getKey = async (req, res) => {
    try {
        res.json({
            status: 200,
            key: process.env.RAZORPAY_ID_KEY
        })
    } catch (error) {
        res.json({
            status: 500,
            message: "internal server error",
            order
        })
    }
}

const verifyPayment = async (req, res) => {
    try {
        const { razorpayPaymentId, razorpayOrderId } = req.body;
        const payment = await razorpayInstance.payments.fetch(razorpayPaymentId);

        if (payment.order_id === razorpayOrderId && payment.status === 'captured') {
            await paymentModel.create({
                razorpayPaymentId,
                razorpayOrderId
            });
            res.json({
                status: 200,
                message: "Payment verification successful",
            });
        } else {
            res.json({
                status: 200,
                message: "Payment verification failed",
            });
        }
    } catch (error) {
        console.log(error.message);
        res.json({
            status: 500,
            message: "Internal server error",
        });
    }
};

module.exports = {
    createOrd,
    getKey,
    verifyPayment
}