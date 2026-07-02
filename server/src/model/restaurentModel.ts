import mongoose, { Types } from "mongoose";

Types;
export interface IRestaurent {
  user: Types.ObjectId;
  restaurentName: string;
  city: string;
  country: string;
  deliveryTime: number;
  cuisines: string[];
  menus: Types.ObjectId[];
  imageUrl: string;
}

const restaurentSchema = new mongoose.Schema<IRestaurent>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    restaurentName: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    deliveryTime: { type: Number, required: true },
    cuisines: [{ type: String, required: true }],
    menus: [{ type: mongoose.Schema.Types.ObjectId, ref: "Menu" }],
    imageUrl: { type: String, required: true },
  },
  { timestamps: true },
);

export const Restaurent = mongoose.model("Restaurent", restaurentSchema);
