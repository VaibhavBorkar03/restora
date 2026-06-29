import { User } from "../model/userModel.js";
import bcrypt from "bcryptjs";
export const signup = async (req, res) => {
    try {
        const { fullname, email, password, contact } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User is already exist with this email",
            });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        // generate verification code
        await User.create({
            fullname,
            email,
            password: hashPassword,
            contact: Number(contact),
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
        });
    }
    catch (error) {
        console.log(error);
    }
};
