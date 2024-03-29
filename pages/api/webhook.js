import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
const stripe = require("stripe")(process.env.STRIPE_SK);
import { buffer } from "micro";

const endpointSecret =
  "whsec_e5ba31c3ad43ede490b1a8d42aabb3296a5ad7d0843e81194c848daea359f1ce";

export default async function handler(req, res) {
  await mongooseConnect();

  const sig = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      await buffer(req),
      sig,
      endpointSecret
    );
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const data = event.data.object;
      // Then define and call a function to handle the event payment_intent.succeeded
      const orderId = data.metadata.orderId;
      const paid = data.payment_status === "paid";
      if (orderId && paid) {
        await Order.findByIdAndUpdate(orderId, { paid: true });
      }
      console.log(data);
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).send("ok");
}

export const config = {
  //will not parse the body
  api: { bodyParser: false },
};

//amazed-ease-avid-wieldy
//account id acct_1OxaalIzQEdXvKZd
