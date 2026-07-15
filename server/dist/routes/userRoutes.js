import express from "express";
import { checkAuth, forgotPassword, login, logout, resetPassword, signup, updateProfile, verifyEmail, } from "../controllers/userControllers.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import upload from "../middleware/multer.js";
const router = express.Router();
router.route("/signup").post(upload.none(), signup);
router.route("/verify-email").post(upload.none(), verifyEmail);
router.route("/check-auth").get(isAuthenticated, checkAuth);
router.route("/login").post(upload.none(), login);
router.route("/logout").post(logout);
router.route("/forgot-password").post(upload.none(), forgotPassword);
router.route("/reset-password/:token").post(upload.none(), resetPassword);
router
    .route("/profile/update")
    .put(isAuthenticated, upload.single("profilePicture"), updateProfile);
export default router;
