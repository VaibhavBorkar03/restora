import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import upload from "../middleware/multer.js";
import { addMenu, editMenu } from "../controllers/menuControllers.js";
const router = express.Router();
router.route("/add").post(isAuthenticated, upload.single("image"), addMenu);
router
    .route("/edit/:id")
    .put(isAuthenticated, upload.single("image"), editMenu);
export default router;
