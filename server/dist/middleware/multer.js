import multer from "multer";
const storage = multer.memoryStorage(); //store image on RAM (temporary storage)
const upload = multer({
    //upload to cloud or cluodinary immediately
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});
export default upload;
