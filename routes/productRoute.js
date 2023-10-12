import express from "express";
import { isAdmin, isSignIn } from "../middlewares/authMiddleware.js";
import {
  allProductsController,
  createProductController,
  deleteProductController,
  singleProductController,
  updateProductController,
} from "../controllers/productController.js";
import upload from "../middlewares/upload.js";

const router = express.Router();
//routes

//create product
router.post(
  "/create-product",
  isSignIn,
  isAdmin,
  upload.single("image"),
  createProductController
);

//get all product
router.get("/all-products", allProductsController);

//get single product
router.get("/single-product/:id", singleProductController);

//update product
router.put(
  "/update-product/:_id",
  isSignIn,
  isAdmin,
  upload.single("imageUpdate"),
  updateProductController
);

//delete product
router.delete(
  "/delete-product/:_id",
  isSignIn,
  isAdmin,
  deleteProductController
);

export default router;
