import express from "express";
import {
  registerController,
  loginController,
  testController,
} from "../controllers/authController.js";
import { isAdmin, isSignIn } from "../middlewares/authMiddleware.js";

//router obj
const router = express.Router();

//routing

//Register a new user || Post

router.post("/register", registerController);

//Login user || Post
router.post("/login", loginController);

//test route
router.get("/test", isSignIn, isAdmin, testController);

//protected route
router.get("/user-auth", isSignIn, (req, res) => {
  res.status(200).json({ ok: true });
});

export default router;
