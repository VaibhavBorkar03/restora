import { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import { IUser } from "../model/userModel.js";

export const generateToken = async (res: Response, user: IUser) => {
  const token = jwt.sign(
    { userId: user._id },
    process.env.SECRET_KEY as string,
    { expiresIn: "1d" },
  );

  res.cookie("token", token, {
    //express send cookie to browser
    httpOnly: true,
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });

  return token;
};
