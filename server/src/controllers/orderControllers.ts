import { Request, Response } from "express";
import { Restaurent } from "../model/restaurentModel.js";
import { Order } from "../model/orderModel.js";
import stripe from "../config/stripe.js";

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

    const order = new Order({
      restaurent: restaurent._id,
      user: req.id,
      deliveryDetails: checkoutSessionRequest.deliveryDetails,
      cartItems: checkoutSessionRequest.cartItems,
      status: "pending",
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
        ordrId: order._id.toString(),
        images: JSON.stringify(
          menuItems.map((menuItem: any) => menuItem.image),
        ),
      },
    });
    if (!session.url) {
      res.status(404).json({ message: "Error while creating session" });
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

export const createLineItems = async (
  checkoutSessionRequest: checkoutSessionRequest,
  menuItems: any,
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
            image: menuItem.image,
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
