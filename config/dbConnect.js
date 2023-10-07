import mongoose from "mongoose";

//config .env
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connection Successful");
  } catch (error) {
    console.log("Connection failed dur to error : ", error);
  }
};

export default connectDB;
