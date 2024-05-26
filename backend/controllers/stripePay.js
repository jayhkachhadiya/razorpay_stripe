const {STRIPE_SECRET_KEY,STRIPE_PUBLISHABLE_KEY}=process.env
const stripe = require('stripe')(STRIPE_SECRET_KEY);

const getData = async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            success_url: 'https://example.com/success',
            line_items: [{
                price: 'price_1MotwRLkdIwHu7ixYcPLm5uZ',
                quantity: 2,
            }],
            mode: 'payment',
        });

        return res.json({
            status: 200,
            data: session
        });
    } catch (error) {
        // Handle errors here
        console.log("---------------------------------------")
        console.error('Error:', error);
        console.log("+++++++++++++++++++++++++++++++++++++++")

        return res.status(500).json({
            status: 500,
            error: 'Internal Server Error'
        });
    }
}

const postData=async(req,res)=>{
  try {
    if (!req.body.items || !Array.isArray(req.body.items)) {
      throw new Error("Items array not found or is not an array.");
    }
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'], 
      // line_items: [
      //   {
      //     price: 'price_1MotwRLkdIwHu7ixYcPLm5uZ', // Replace with your actual price ID
      //     quantity: 1,
      //   },
      // ],

      line_items:req.body.items.map((item)=>{
        console.log(item,"itemitem")
        return{
          price_data:{
            currency:'inr',
            product_data:{
              name:item.name
            },
            unit_amount:(item.price)*100,
          },
          quantity:item.quantity
        }
      }),
      mode: 'payment',
      success_url: 'https://example.com/success',
      cancel_url: 'https://example.com/cancel',
    });
    // res.json({ id: session.id });
    res.json({ checkoutUrl: session.url });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
    getData,
    postData
}
