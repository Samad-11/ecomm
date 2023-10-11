import jwt from "jsonwebtoken";
import userModel from "../model/userModel.js";

export const isSignIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (token) {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode;
      next();
    }
    // else {
    //   res.status(401).json({ success: false, message: "Authorization Failed" });
    // }
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    console.log(req);
    const user = await userModel.findOne({ _id: req.user._id });
    if (user.role === 1) {
      // res
      //   .status(200)
      //   .json({ success: true, message: "Admin Authorization Success" });
      next();
    }
  } catch (error) {
    console.log(error);
  }
};
