import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import Category from "./category";

const tagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      minLength: 1,
      maxLength: 20,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    parentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

tagSchema.plugin(uniqueValidator, "is already taken.");

export default mongoose.models.Tag || mongoose.model("Tag", tagSchema);
