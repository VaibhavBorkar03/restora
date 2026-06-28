import mongoose, { Document } from "mongoose";

export interface IRestaurent {
  user: mongoose.Schema.Types.ObjectId;
  restaurentName: string;
  city: string;
  country: string;
  deliveryTime: number;
  cuisines: string[];
  menus: mongoose.Schema.Types.ObjectId[];
  imageUrl: string;
}

export interface IRestaurentDocument extends IRestaurent, Document {
  createdAt: Date;
  updatedAt: Date;
}

const restaurentSchema = new mongoose.Schema<IRestaurentDocument>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    restaurentName: { type: String, required: true },
    city: { type: String, required: true },
    country: {},
    deliveryTime: { type: Number, required: true },
    cuisines: [{ type: String, required: true }],
    menus: [{ type: mongoose.Schema.Types.ObjectId, ref: "Menu" }],
    imageUrl: { type: String, required: true },
  },
  { timestamps: true },
);

export const Restaurent = mongoose.model("Restaurent", restaurentSchema);
