import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import restaurantRoutes from "./routes/restauentRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { stripeWebhook } from "./controllers/orderControllers.js";
import path from "path";
dotenv.config();

const app = express();
const __dirname = path.resolve();
console.log("__dirname", __dirname);

app.post(
  "/api/v1/order/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook,
);

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
// app.use(bodyParser.json({ limit: "10mb" }));

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
};
app.use(cors(corsOptions));

//api
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/restaurant", restaurantRoutes);
app.use("/api/v1/menu", menuRoutes);
app.use("/api/v1/order", orderRoutes);
// http://localhost:8000//api/v1/user/signup

const PORT = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, "/client/dist")));
//for unkonwn route hits shows frontend home screen

app.get(/.*/, (_, res) => {
  res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on http://localhost:${PORT}`);
});
