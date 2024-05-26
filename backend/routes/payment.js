const express = require('express')
const router = express.Router()
const { createOrd ,getKey,verifyPayment} = require('../controllers/payment.js')

router.post('/create', createOrd)
router.get('/get', getKey)
router.post('/verify', verifyPayment)

module.exports = router