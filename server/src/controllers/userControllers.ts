import { Request, Response } from "express";
import { User } from "../model/userModel.js";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { generateVerificationCode } from "../utils/generateVerificationCode.js";
import cloudinary from "../config/cloudinary.js";
import {
  sendPasswordResetEmail,
  sendResetSuccessEmail,
  sendWelcomeEmail,
  verificationEmail,
} from "../utils/email.js";

export const signup = async (req: Request, res: Response) => {
  try {
    const { fullname, email, password, contact } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(404).json({
        success: false,
        message: "User is already exist with this email",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    // console.log("hashPassword", hashPassword);
    // generate verification code/otp
    const verificationToken = generateVerificationCode();
    // console.log("verificationToken", verificationToken);

    user = await User.create({
      fullname,
      email,
      password: hashPassword,
      contact: Number(contact),
      verificationToken,
      verificationTokenExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    // console.log("Email", user.email);

    await verificationEmail(user.email, verificationToken);

    return res.status(201).json({
      success: true,
      message: "Otp send on your mail",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server errror",
    });
  }
};

//for email
export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { verificationCode } = req.body;
    // console.log("verificationCode", verificationCode);

    const user = await User.findOne({
      //otp
      verificationToken: verificationCode,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Verification code is incorrect",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    generateToken(res, user);
    await sendWelcomeEmail(user.email, user.fullname);

    // console.log("user object", user.toObject());

    return res.status(200).json({
      success: true,
      message: "Account created successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server errror",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    // console.log("email, password", email, password);

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User is not exist with this email",
      });
    }

    // console.log("user.password", user.password);

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Password is Incorrect",
      });
    }

    generateToken(res, user);
    user.lastLogin = new Date();
    await user.save();

    // console.log("user object", user.toObject());
    const userWithoutPwd = await User.findOne({ email }).select("-password");

    return res.status(200).json({
      success: true,
      message: "User login successfully",
      user: userWithoutPwd,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server errror",
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    return res.clearCookie("token").status(200).json({
      success: true,
      message: "Loguot successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server errror",
    });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    // console.log("email", email);

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User is not exit with this email",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex"); //create random token

    const resetTokenExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000); //this rendom token valid till one hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;

    // console.log(" user.resetPasswordToken", user.resetPasswordToken);
    // console.log("user.resetPasswordExpiresAt", user.resetPasswordExpiresAt);

    await user.save();
    // console.log("user", user);

    //send reset link to email for forgot password
    await sendPasswordResetEmail(
      user.email,
      `${process.env.FRONTEND_URL}/reset-password/${resetToken}`,
    );

    return res.status(200).json({
      success: true,
      message: "password reset link send to your email, check it",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server errror",
    });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    // console.log("token", token);
    // console.log("newPassword", newPassword);

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid or reset token",
      });
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();

    await sendResetSuccessEmail(user.email, user.fullname);

    return res.status(200).json({
      success: true,
      message: "Your password reset successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server errror",
    });
  }
};

// for login
export const checkAuth = async (req: Request, res: Response) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User is not exist",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server errror",
    });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.id;
    const { fullname, email, address, city, country, profilePicture } =
      req.body;

    //cloudinary
    const cloudResponse = await cloudinary.uploader.upload(profilePicture);
    const updateData = {
      fullname,
      email,
      address,
      city,
      country,
      profilePicture: cloudResponse.secure_url,
    };

    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    }).select("-password");

    return res.status(200).json({
      success: true,
      user,
      message: "Profile Updated Succesfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server errror",
    });
  }
};
