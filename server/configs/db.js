import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongodbURI = process.env.MONGODB_URI;

    if (!mongodbURI) {
      throw new Error("MONGODB_URI environment variable not set");
    }

    await mongoose.connect(mongodbURI);

    console.log("Database connected successfully");
    console.log("Connected to DB:", mongoose.connection.name);

  } catch (error) {
    console.log("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

export default connectDB;
