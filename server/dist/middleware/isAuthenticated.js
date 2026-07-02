import jwt from "jsonwebtoken";
export const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "User not Authenticated",
            });
        }
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        if (!decode) {
            return res.status(401).json({
                success: false,
                message: "Invalid token",
            });
        }
        req.id = decode.userId;
        next();
    }
    catch (error) {
        console.log(error);
        throw new Error("Internal server error");
    }
};
