import { Request, Response } from "express";
import { Restaurent } from "../model/restaurentModel.js";
import uploadImageOnCloudinary from "../utils/uploadImageOnCloudinary.js";
import { Order } from "../model/orderModel.js";

export const createRestaurent = async (req: Request, res: Response) => {
  try {
    const { restaurentName, city, country, deliveryTime, cuisines } = req.body;
    // console.log(
    //   "restaurentName, city, country, deliveryTime, cuisines",
    //   restaurentName,
    //   city,
    //   country,
    //   deliveryTime,
    //   cuisines,
    // );

    const file = req.file;
    // console.log("image file", file);

    // console.log(" req.id ", req.id);

    const restaurent = await Restaurent.findOne({ user: req.id });

    // console.log("restaurent", restaurent);

    if (restaurent) {
      return res.status(404).json({
        success: false,
        message: "Restaurent is already exist ",
      });
    }

    if (!file) {
      return res.status(404).json({
        success: false,
        message: "Imgae is required",
      });
    }

    const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);
    // console.log("imageUrl", imageUrl);

    const cuisinesArray = cuisines
      .split(",")
      .map((item: string) => item.trim());

    await Restaurent.create({
      user: req.id,
      restaurentName,
      city,
      country,
      deliveryTime,
      cuisines: cuisinesArray,
      imageUrl,
    });

    return res.status(201).json({
      success: true,
      message: "Restaurent created successfully",
    });
  } catch (error) {
    console.log(error);
    throw new Error("Internal server error");
  }
};

export const updateRestaurent = async (req: Request, res: Response) => {
  try {
    const { restaurentName, city, country, cuisines, deliveryTime } = req.body;
    const file = req.file;
    if (!file) {
      return res.status(404).json({
        success: false,
        message: "Image file not exist",
      });
    }

    const restaurent = await Restaurent.findOne({ user: req.id });

    const cuisinesArray = cuisines
      .split(",")
      .map((item: string) => item.trim());

    if (!restaurent) {
      return res.status(400).json({
        success: false,
        message: "Restaurant is not exit for this user",
      });
    }
    restaurent.restaurentName = restaurentName;
    restaurent.city = city;
    restaurent.country = country;
    restaurent.deliveryTime = deliveryTime;
    restaurent.cuisines = cuisinesArray;

    if (file) {
      const image = await uploadImageOnCloudinary(file as Express.Multer.File);
      restaurent.imageUrl = image;
    }

    await restaurent.save();

    return res.status(200).json({
      success: true,
      message: "Restaurent updated successfully",
      restaurent,
    });
  } catch (error) {
    console.log(error);
    throw new Error("Internal server error");
  }
};

export const getRestaurent = async (req: Request, res: Response) => {
  try {
    const restaurent = await Restaurent.findOne({ user: req.id }).populate(
      "menus",
    );
    if (!restaurent) {
      return res.status(404).json({
        success: false,
        restaurent: [],
        message: "Restauent not exist for this user",
      });
    }

    return res.status(200).json({
      success: true,
      restaurent,
    });
  } catch (error) {
    console.log(error);
    throw new Error("Internal server error");
  }
};

export const getRestaurentOrders = async (req: Request, res: Response) => {
  try {
    const restaurent = await Restaurent.findOne({ user: req.id });
    if (!restaurent) {
      return res.status(400).json({
        success: false,
        message: "Restaurant is not exit for this user",
      });
    }

    const orders = Order.find({ restaurent: restaurent.id })
      .populate("restaurent")
      .populate("user");

    return res.status(200).json({ success: true, orders });
  } catch (error) {
    console.log(error);
    throw new Error("Internal server error");
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order is not found",
      });
    }

    order.status = status;
    await order.save();

    return res.status(200).json({
      success: true,
      status: order.status,
      message: "Status updated",
    });
  } catch (error) {
    console.log(error);
    throw new Error("Internal server error");
  }
};

export const searchRestaurent = async (req: Request, res: Response) => {
  try {
    const searchText = req.params.searchText || "";
    const searchQuery = req.params.searchQuery || "";
    const query: any = {};
    const selectedCuisine = ((req.query.selectedCuisine as string) || "")
      .split(",")
      .filter((cuisine) => cuisine);
    if (searchText) {
      query.$or = [
        { restaurentName: { $regex: searchText, $options: "i" } },
        { city: { $regex: searchText, $options: "i" } },
        { country: { $regex: searchText, $options: "i" } },
      ];
    }

    if (searchQuery) {
      query.$or = [
        { restaurentName: { $regex: searchText, $options: "i" } },
        { cuisines: { $regex: searchQuery, options: "i" } },
      ];
    }

    if (selectedCuisine.length > 0) {
      query.cuisines = { $in: selectedCuisine };
    }

    const restaurent = await Restaurent.find(query);
    return res.status(200).json({
      success: true,
      restaurent,
    });
  } catch (error) {
    console.log(error);
    throw new Error("Internal server error");
  }
};
