import slugify from "slugify";
import productModel from "../model/productModel.js";
import { unlink } from "node:fs";
import path from "path";

export const createProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity } = req.body;
    if (!name || !description || !price || !category || !quantity) {
      return res
        .status(401)
        .json({ success: false, message: "All fields are required..." });
    }
    const product = new productModel({
      name,
      description,
      price,
      category,
      quantity,
      slug: slugify(name),
      image: req.file.path,
    });

    await product.save();
    if (!product) {
      return res
        .status(500)
        .json({ success: false, message: "something went wrong" });
    }
    res.status(200).json({
      success: true,
      message: "product created successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error in create product controller",
      error,
    });
  }
};

export const allProductsController = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.status(200).json({ success: true, count: products.length, products });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in all products controller",
      error,
    });
  }
};

export const singleProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findById(id);
    if (!product) {
      res.status(404).json({ success: false, message: "Product Not Found" });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    console.log();
    res.status(500).json({
      success: false,
      message: "Error in single product controller",
      error,
    });
  }
};

export const updateProductController = async (req, res) => {
  try {
    const { _id } = await req.params;
    let toUpdate = await req.body;
    if (req.body.name) {
      toUpdate = Object.assign({ slug: slugify(req.body.name) });
    }
    if (req.file) {
      let img = await productModel.findById(_id).select("image");
      console.log(path.resolve(img.image));
      unlink(path.resolve(img.image), (err) => {
        if (err) throw err;
        console.log("removed");
      });
      toUpdate = Object.assign({ image: req.file.path });
    }
    const result = await productModel.findByIdAndUpdate(_id, toUpdate, {
      new: true,
    });
    if (!result) {
      return res
        .status(401)
        .json({ success: false, message: "Error in update product" });
    }
    res.status(200).json({ success: true, result });
  } catch (error) {
    console.log();
    res.status(500).json({
      success: false,
      message: "Error in update product controller",
      error,
    });
  }
};

export const deleteProductController = async (req, res) => {
  try {
    const { _id } = await req.params;
    const deletedProduct = await productModel.findByIdAndDelete(_id);
    if (!deletedProduct) {
      return res
        .status(401)
        .json({ success: false, message: "Something went Wrong ..." });
    }
    unlink(path.resolve(deletedProduct.image), (err) => {
      if (err) {
        throw err;
      }
      console.log("deleted");
    });
    res.status(200).json({ success: true, deletedProduct });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in delete product controller",
      error,
    });
  }
};
