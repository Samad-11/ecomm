import express from "express";
import {
  deleteUserController,
  getAllUserController,
} from "../controllers/userListController.js";
import { isAdmin, isSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

//routes

router.get("/get-all-users", isSignIn, isAdmin, getAllUserController);
router.delete("/delete-user/:id", isSignIn, isAdmin, deleteUserController);

export default router;
