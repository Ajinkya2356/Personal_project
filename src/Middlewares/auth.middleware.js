import { User } from "../Models/user.model.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken";
import apiError from "../utils/apiError.js";
export const verifyJWT = AsyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new apiError(401, "Unauthorized tokens");
    }

    const decodedInfo = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedInfo._id).select(
      "-password -refreshToken"
    );
    // console.log("User", user);
    if (!user) {
      throw new apiError(401, "Invalid access token");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new apiError(401, error?.message || "Invalid access Token");
  }
});
