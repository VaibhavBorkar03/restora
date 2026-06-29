import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
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
}, { timestamps: true });
export const Order = mongoose.model("Order", orderSchema);
