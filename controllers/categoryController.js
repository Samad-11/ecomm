import slugify from "slugify";
import categoryModel from "../model/categoryModel.js";

export const createCategoryController = async (req, res) => {
  try {
    const { name } = await req.body;
    if (!name) {
      return res
        .status(401)
        .json({ success: false, message: "Category Name required" });
    }
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res
        .status(401)
        .json({ success: false, message: "Category Already Exists" });
    }
    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();
    res
      .status(200)
      .json({
        success: true,
        message: "category created successfully...",
        category,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error,
    });
  }
};

export const getAllCategoryController = async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
};

export const getCategoryController = async (req, res) => {
  try {
    const { id } = await req.params;
    const category = await categoryModel.findById(id);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category Not Found" })
        .send("Error");
    }
    res.status(200).json({ success: true, category });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
};

export const editCategoryController = async (req, res) => {
  try {
    const { id } = await req.params;
    const { name } = req.body;
    const editedCategory = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    if (!editedCategory) {
      return res
        .status(401)
        .json({ success: false, message: "Something went Wrong" });
    }
    res.status(200).json({ success: true, editedCategory });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
};

export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = await req.params;
    const deletedCategory = await categoryModel.findByIdAndRemove(id);
    if (!deletedCategory) {
      return res
        .status(401)
        .json({ success: false, message: "something went wrong" });
    }
    res.status(200).json({
      success: true,
      message: "Deletion of Category Done...",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
};
