import { Request, Response } from "express";
import uploadImageOnCloudinary from "../utils/uploadImageOnCloudinary.js";
import { Menu } from "../model/menuModel.js";
import { Restaurent } from "../model/restaurentModel.js";
import mongoose, { Types } from "mongoose";

export const addMenu = async (req: Request, res: Response) => {
  try {
    const { name, description, price } = req.body;
    const file = req.file;
    if (!file) {
      return res.status(404).json({
        success: false,
        message: "File is required",
      });
    }

    const image = await uploadImageOnCloudinary(file as Express.Multer.File);
    const menu: any = await Menu.create({
      //push this menu to restaurent
      name,
      description,
      price,
      image,
    });
    const restaurent = await Restaurent.findOne({ user: req.id });
    if (restaurent) {
      (restaurent.menus as Types.ObjectId[]).push(menu._id);
      await restaurent.save();
    }
    return res.status(201).json({
      success: true,
      message: "Menu added successfully",
      menu,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const editMenu = async (req: Request, res: Response) => {
  try {
    const menuId = req.params.id;
    

    const { name, description, price } = req.body;
    const file = req.file;
    

    const menu = await Menu.findById(menuId);

    if (!menu) {
      return res.status(404).json({
        success: false,
        message: "Menu is not found",
      });
    }
    menu.name = name;
    menu.description = description;
    menu.price = price;

    if (file) {
      const imageUrl = await uploadImageOnCloudinary(file);
      menu.image = imageUrl;
    }

    await menu.save();

    return res.status(200).json({
      success: true,
      message: "Menu updated successfully",
      menu,
    });
  } catch (error) {

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
