import React, { useState } from 'react'
import ProImage from './ProImage';
import axios from 'axios'

export default function ProButton() {

    const product = {
        name: 'Nivia Carbonite 5.0 Football Shoes',
        description: '',
        image: 'https://m.media-amazon.com/images/I/71u2XOFXAIL._AC_UL320_.jpg',
    };

    const amount = 100
    async function checkOutHandler(amount) {
        const { data: { key } } = await axios.get("http://localhost:4000/razorPay/get")

        const { data: { order } } = await axios.post("http://localhost:4000/razorPay/create", {
            amount
        })

        const options = {
            key: key,
            amount: order.amount,
            currency: "INR",
            name: "E commarce ",
            description: "E commarce",
            image: "https://i.pinimg.com/736x/2f/a2/32/2fa2321cb1703d6eef32410774156fed.jpg",
            order_id: order.id,
            // callback_url: "http://localhost:4000/razorPay/verify",
            handler: function (response) {
                console.log(response.razorpay_payment_id)
                axios.post('http://localhost:4000/razorPay/verify   ', {
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                }).then((verificationResponse) => {
                    //   setMessage(verificationResponse.data.message);
                    console.log(verificationResponse)
                });
            },
            prefill: {
                name: "Gaurav Kumar",
                email: "gaurav.kumar@example.com",
                contact: "9000090000"
            },
            notes: {
                address: "Razorpay Corporate Office"
            },
            theme: {
                color: "#0000FF"
            }
        };
        var razor = new window.Razorpay(options);
        // razorpayObject.on('payment.failed', function (response) {
        //     alert("Payment Failed");
        // });
        razor.open();
    }
    const [quantity, setQuantity] = useState(5); // Assuming you have state for quantity
    const [itemPrice, setItemPrice] = useState(200); // Example price
    const [itemName, setItemName] = useState('ayan'); 
  
    const handleCheckout = async (e) => {

      try {
        const items = [{
        //   id: 1, // Example ID
          quantity: quantity,
          price: itemPrice,
          name: itemName
        }];
 
        const response = await axios.post('http://localhost:4000/stripe/create-checkout', {
          items: items
        });

        // console.log(response.data.checkoutUrl)
        window.location.href = response.data.checkoutUrl; 
        // window.history.pushState({}, '', response.data.success_url);
      } catch (error) {
        console.error('Error during checkout:', error);
      }
    };

    return (
        <div>
            <ProImage product={product} />
            <div className=' d-flex align-items-end flex-column ' >
                <button type="submit" className="nir-btn" onClick={() => checkOutHandler(amount)}>
                    Razorpay
                </button>
                <button type="submit" className="nir-btn" onClick={() => handleCheckout()}>
                    stripe
                </button>
            </div>


        </div>
    )
}
