import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
const corsOptions = {
    origin: "http://localhost:5173/",
    credentials: true,
};
app.use(cors(corsOptions));
//api
app.use("/api/v1/user", userRoutes);
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on http://localhost:${PORT}`);
});
