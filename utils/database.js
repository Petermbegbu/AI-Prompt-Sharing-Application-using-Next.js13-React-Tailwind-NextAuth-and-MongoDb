import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDb is already Connected");

    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "AIPromptApp",
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    isConnected = true;

    console.log("MongoDb is Connected");
  } catch (error) {
    console.log("Database Error", error);
  }
};
