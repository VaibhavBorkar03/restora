import express from "express";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
import upload from "../middleware/multer.js";
import {
  createRestaurent,
  getRestaurent,
  getRestaurentById,
  getRestaurentOrders,
  searchRestaurent,
  updateOrderStatus,
  updateRestaurent,
} from "../controllers/restaurentControllers.js";

const router = express.Router();

router
  .route("/")
  .post(isAuthenticated, upload.single("imageFile"), createRestaurent)
  .get(isAuthenticated, getRestaurent)
  .put(isAuthenticated, upload.single("imageFile"), updateRestaurent);

router.route("/orders").get(isAuthenticated, getRestaurentOrders);
router.route("/:id").get(isAuthenticated, getRestaurentById);

router.route("/order/:orderId/status").put(isAuthenticated, updateOrderStatus);
router.route("/search/:searchText").get(isAuthenticated, searchRestaurent);

export default router;
