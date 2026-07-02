import { Restaurent } from "../model/restaurentModel.js";
import uploadImageOnCloudinary from "../utils/uploadImageOnCloudinary.js";
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
        await Restaurent.create({
            user: req.id,
            restaurentName,
            city,
            country,
            deliveryTime,
            cuisines: JSON.parse(cuisines),
            imageUrl,
        });
        return res.status(201).json({
            success: true,
            message: "Restaurent created successfully",
        });
    }
    catch (error) {
        throw new Error("Internal server error");
    }
};
