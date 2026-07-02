import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import upload from "../middleware/multer.js";
import { createRestaurent } from "../controllers/restaurentControllers.js";
const router = express.Router();
router
    .route("/")
    .post(isAuthenticated, upload.single("image"), createRestaurent);
export default router;
