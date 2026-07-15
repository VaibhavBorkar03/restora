import { Restaurent } from "../model/restaurentModel.js";
import uploadImageOnCloudinary from "../utils/uploadImageOnCloudinary.js";
import { Order } from "../model/orderModel.js";
export const createRestaurent = async (req, res) => {
    try {
        const { restaurentName, city, country, deliveryTime, cuisines } = req.body;
        const file = req.file;
        const restaurent = await Restaurent.findOne({ user: req.id });
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
        const imageUrl = await uploadImageOnCloudinary(file);
        const cuisinesArray = cuisines
            .split(",")
            .map((item) => item.trim());
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
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
export const updateRestaurent = async (req, res) => {
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
            .map((item) => item.trim());
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
            const image = await uploadImageOnCloudinary(file);
            restaurent.imageUrl = image;
        }
        await restaurent.save();
        return res.status(200).json({
            success: true,
            message: "Restaurent updated successfully",
            restaurent,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
export const getRestaurent = async (req, res) => {
    try {
        const restaurent = await Restaurent.findOne({ user: req.id }).populate("menus");
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
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
export const getRestaurentOrders = async (req, res) => {
    try {
        const restaurent = await Restaurent.findOne({ user: req.id });
        if (!restaurent) {
            return res.status(400).json({
                success: false,
                message: "Restaurant is not exit for this user",
            });
        }
        const orders = await Order.find({ restaurent: restaurent._id })
            .populate("restaurent")
            .populate("user");
        return res.status(200).json({ success: true, orders });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
export const updateOrderStatus = async (req, res) => {
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
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
export const searchRestaurent = async (req, res) => {
    try {
        const searchText = req.params.searchText || "";
        const searchQuery = req.params.searchQuery || "";
        const query = {};
        const selectedCuisine = (req.query.selectedCuisine || "")
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
                { restaurentName: { $regex: searchQuery, $options: "i" } },
                { cuisines: { $regex: searchQuery, $options: "i" } },
            ];
        }
        if (selectedCuisine.length > 0) {
            query.cuisines = { $in: selectedCuisine };
        }
        const restaurent = await Restaurent.find(query);
        return res.status(200).json({
            success: true,
            data: restaurent,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
export const getRestaurentById = async (req, res) => {
    try {
        const restaurentId = req.params.id;
        const restaurent = await Restaurent.findById(restaurentId).populate("menus");
        if (!restaurent) {
            return res.status(404).json({
                success: false,
                message: "Restaurent not found",
            });
        }
        return res.status(200).json({
            success: true,
            restaurent,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
