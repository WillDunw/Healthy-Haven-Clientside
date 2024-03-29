import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Order } from "@/models/Order";
const stripe = require('stripe')(process.env.STRIPE_SK);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.json("should be a POST request");
    return;
  }

  const { name, email, city, postalCode, streetAddress, country, cartProducts } =
    req.body;

  await mongooseConnect();

  const productIds = cartProducts;
  const uniqueIds = [...new Set(productIds)];

  const productsInfos = await Product.find({ _id: uniqueIds });

  let line_items = [];
  for (const productId of uniqueIds) {
    const info = productsInfos.find((p) => p._id.toString() === productId);
    const quantity = productIds.filter((id) => id === productId)?.length || 0;
    if (quantity > 0 && info) {
      line_items.push({
        quantity,
        price_data: {
          currency: "CAD",
          product_data: { name: info.title },
          unit_amount: info.price * 100,
        },
      });
    }
  }

  const orderDoc = await Order.create({
    line_items,
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    paid: false,
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode:'payment',
    customer_email: email,
    success_url: process.env.PUBLIC_URL + "/cart?success=1",
    cancel_url: process.env.PUBLIC_URL + "/cart?canceled=1",
    metadata: {
        orderId: orderDoc._id.toString()
    }
  })

  res.json({
    url: session.url
  })
}
