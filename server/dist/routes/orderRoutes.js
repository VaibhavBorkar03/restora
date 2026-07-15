import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import upload from "../middleware/multer.js";
import { createCheckoutSession, getOrders, } from "../controllers/orderControllers.js";
const router = express.Router();
router
    .route("/checkout/checkout-session")
    .post(isAuthenticated, upload.single("image"), createCheckoutSession);
router.route("/").get(isAuthenticated, getOrders);
// router
//   .route("/webhook")
//   .post(express.raw({ type: "application/json" }), stripeWebhook);
export default router;
