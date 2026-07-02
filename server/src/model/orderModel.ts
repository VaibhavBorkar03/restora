import mongoose, { Types } from "mongoose";

type DeliveryDatails = {
  email: string;
  name: string;
  address: string;
  city: string;
};

type CartItems = {
  menuId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export interface IOrder {
  user: Types.ObjectId;
  restaurent: Types.ObjectId;
  deliveryDetails: DeliveryDatails;
  cartItems: CartItems;
  totalAmount: number;
  status:
    | "pending"
    | "confirmed"
    | "delivered"
    | "outfordelivery"
    | "preparing";
}

const orderSchema = new mongoose.Schema<IOrder>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    restaurent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurent",
      required: true,
    },
    deliveryDetails: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
    },
    cartItems: [
      {
        menuId: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        image: { type: String, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: [
        "pending",
        "outfordelivery",
        "preparing",
        "confirmed",
        "delivered",
      ],
      required: true,
    },
  },
  { timestamps: true },
);

export const Order = mongoose.model("Order", orderSchema);
