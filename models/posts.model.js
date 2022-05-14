import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    content: {
        type: String,
    },
      media: {
        type: String
      }
  },
  { timestamps: true }
);

export const PostModel = mongoose.model("Posts", schema);
