import express from "express";
import { isAdmin, isSignIn } from "../middlewares/authMiddleware.js";
import {
  createCategoryController,
  deleteCategoryController,
  editCategoryController,
  getAllCategoryController,
  getCategoryController,
} from "../controllers/categoryController.js";

const router = express.Router();

//routes

//create category
router.post("/create-category", isSignIn, isAdmin, createCategoryController);

//

//get all category
router.get("/all-category", getAllCategoryController);

//get single category
router.get("/category/:id", getCategoryController);

//edit category
router.put("/edit-category/:id", isSignIn, isAdmin, editCategoryController);

//delete category
router.delete(
  "/delete-category/:id",
  isSignIn,
  isAdmin,
  deleteCategoryController
);

export default router;
