import cloudinary from "../config/cloudinary.js";
const uploadImageOnCloudinary = async (file) => {
    const base64Image = Buffer.from(file.buffer).toString("base64"); //convert into string
    const dataUri = `data:${file.mimetype};base64,${base64Image}`; //convert into file format for cloudinary to understand it eg.png, jpg
    //   data:image/png;base64,iVBORw0KGgoAAAANS...
    const uploadResponse = await cloudinary.uploader.upload(dataUri); //upload dataUri to cloudinary
    return uploadResponse.secure_url;
};
export default uploadImageOnCloudinary;
