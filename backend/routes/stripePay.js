 const express = require('express')
const router=express.Router()
const {getData, postData}= require('../controllers/stripePay')

router.get('/',getData)
router.post('/create-checkout',postData)


module.exports=router