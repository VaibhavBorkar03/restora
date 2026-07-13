import { Request, Response } from "express";
import { Restaurent } from "../model/restaurentModel.js";
import { Order } from "../model/orderModel.js";
import stripe from "../config/stripe.js";
import Stripe from "stripe";

type checkoutSessionRequest = {
  cartItems: {
    menuId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  deliveryDetails: {
    name: string;
    email: string;
    address: string;
    city: string;
  };
  restaurentId: string;
};

export const createCheckoutSession = async (req: Request, res: Response) => {
  try {
    const checkoutSessionRequest: checkoutSessionRequest = req.body;
    const restaurent = await Restaurent.findById(
      checkoutSessionRequest.restaurentId,
    ).populate("menus");

    if (!restaurent) {
      return res.status(404).json({
        success: false,
        message: "Restaurent not exist",
      });
    }

    const totalAmount = checkoutSessionRequest.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );

    const order: any = new Order({
      restaurent: restaurent._id,
      user: req.id,
      deliveryDetails: checkoutSessionRequest.deliveryDetails,
      cartItems: checkoutSessionRequest.cartItems,
      status: "pending",
      totalAmount,
    });

    //line items
    const menuItems = restaurent.menus;
    const lineItems = createLineItems(checkoutSessionRequest, menuItems);

    //create session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_address_collection: {
        allowed_countries: ["GB", "US", "CA"],
      },
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/order/status`,
      cancel_url: `${process.env.FRONTEND_URL}/cart`,
      metadata: {
        orderId: order._id.toString(),
        images: JSON.stringify(
          menuItems.map((menuItem: any) => menuItem.image),
        ),
      },
    });

    if (!session.url) {
      return res.status(404).json({
        success: false,
        message: "Error while creating checkout session",
      });
    }

    await order.save();
    return res.status(200).json({
      session,
    });
  } catch (error) {
    console.log(error);
    throw new Error("Internal server error");
  }
};

export const stripeWebhook = async (request: Request, response: Response) => {
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = request.headers["stripe-signature"] as string;
  let event: Stripe.Event;

  // Only verify the event if you have an endpoint secret defined.
  // Otherwise use the basic event deserialized with JSON.parse
  try {
    event = stripe.webhooks.constructEvent(
      request.body,
      signature,
      endpointSecret as string,
    );
  } catch (err: any) {
    console.log(`⚠️  Webhook signature verification failed.`, err.message);
    return response.sendStatus(400);
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;

      const orderId = session.metadata?.orderId;

      if (!orderId) {
        return response.status(400).json({
          message: "Order Id not found in metadata",
        });
      }

      const order = await Order.findById(orderId);

      if (!order) {
        return response.status(404).json({
          message: "Order not found",
        });
      }

      order.status = "confirmed";

      order.totalAmount = (session.amount_total ?? 0) / 100;

      await order.save();

      console.log("Order Updated Successfully");

      break;
    }

    default:
      console.log(`Unhandled event: ${event.type}`);
  }

  // Handle the event
  // if (event.type === "checkout.session.completed") {
  //   try {
  //     const session = event.data.object as Stripe.Checkout.Session;
  //     const order = await Order.findById(session.metadata?.orderId);

  //     if (!order) {
  //       return response.status(404).json({ message: "Order not found" });
  //     }

  //     // Update the order with the amount and status
  //     if (session.amount_total) {
  //       order.totalAmount = session.amount_total / 100;
  //     }
  //     order.status = "confirmed";

  //     await order.save();
  //   } catch (error) {
  //     console.error("Error handling event:", error);
  //     return response.status(500).json({ message: "Internal Server Error" });
  //   }

  //   // case "payment_intent.succeeded":
  //   //   const paymentIntent = event.data.object;
  //   //   console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
  //   //   // Then define and call a method to handle the successful payment intent.
  //   //   // handlePaymentIntentSucceeded(paymentIntent);
  //   //   break;
  //   // case "payment_method.attached":
  //   //   const paymentMethod = event.data.object;
  //   //   // Then define and call a method to handle the successful attachment of a PaymentMethod.
  //   //   // handlePaymentMethodAttached(paymentMethod);
  //   //   break;
  //   // default:
  //   //   // Unexpected event type
  //   //   console.log(`Unhandled event type ${event.type}.`);
  // }

  // Return a 200 response to acknowledge receipt of the event
  return response.status(200).json({
    received: true,
  });
  // response.send();
};

export const createLineItems = (
  checkoutSessionRequest: checkoutSessionRequest,
  menuItems: any[],
) => {
  try {
    // 1. create line item
    const lineItems = checkoutSessionRequest.cartItems.map((cartItem) => {
      const menuItem = menuItems.find(
        (item: any) => item._id.toString() === cartItem.menuId,
      );
      if (!menuItem) throw new Error("Menu item not found");
      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: menuItem.name,
            images: [menuItem.image],
          },
          unit_amount: menuItem.price * 100,
        },
        quantity: cartItem.quantity,
      };
    });

    // 2. return line items

    return lineItems;
  } catch (error) {
    console.log(error);
    throw new Error("Internal server error");
  }
};
