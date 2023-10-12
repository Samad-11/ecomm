import mongoose, { Schema, mongo } from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    slug: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    price: {
      type: String,
      require: true,
    },
    image: {
      type: String,
    },
    quantity: {
      type: String,
      require: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
    tags: [
      {
        type: String,
        required: false,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("product", productSchema);
