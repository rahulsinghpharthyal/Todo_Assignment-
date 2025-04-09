import { v2 as cloudinary } from "cloudinary";

const uploadToCloudinary = async (file) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
      api_key: process.env.CLOUDINARY_CLIENT_API,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const result = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });
    return result;
  } catch (error) {
    console.log("Cloudinary Upload Failed:", err);
  }
};

export default uploadToCloudinary;
