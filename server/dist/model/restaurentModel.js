import mongoose from "mongoose";
const restaurentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    restaurentName: { type: String, required: true },
    city: { type: String, required: true },
    country: {},
    deliveryTime: { type: Number, required: true },
    cuisines: [{ type: String, required: true }],
    menus: [{ type: mongoose.Schema.Types.ObjectId, ref: "Menu" }],
    imageUrl: { type: String, required: true },
}, { timestamps: true });
export const Restaurent = mongoose.model("Restaurent", restaurentSchema);
