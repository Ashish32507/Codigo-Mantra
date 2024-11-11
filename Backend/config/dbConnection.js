import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const dbConnection = async () => {
  try {
    await mongoose
      .connect(process.env.DATABASE_URL)
      .then(() => {
        console.log("Your Database Connected Successfully");
      })
      .catch((err) => {
        console.log("Your Database Connection Faild ", err);
      });
  } catch (err) {
    console.log("Your Database Is Not Connected Internal Error Occured");
  }
};
