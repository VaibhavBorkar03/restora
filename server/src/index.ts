import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("Server is running...");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on http://localhost:${PORT}`);
});
