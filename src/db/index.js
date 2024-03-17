import mongoose from "mongoose";
const connectDB = async () => {
  try {
    const connection = await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.DATABASE_NAME}`
    );
    console.log(`DB successfully running at `, connection.connection.host);
  } catch (error) {
    console.log("Error", error);
    console.log(`DB connection error: ${error.message}`);
    process.exit(1);
  }
};
export default connectDB;
