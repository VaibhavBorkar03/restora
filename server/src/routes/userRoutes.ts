import express from "express";
import {
  forgotPassword,
  login,
  logout,
  resetPassword,
  signup,
  updateProfile,
} from "../controllers/userControllers.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").post(isAuthenticated, logout);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password").post(resetPassword);
router.route("/user/:id/update").post(isAuthenticated, updateProfile);
export default router;
