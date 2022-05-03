import mongoose from "mongoose";

const schema = mongoose.Schema(
  {
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    avatar: {
      type: String,
      default: "img/avatar-default.png",
    },
    gender: { type: String, require: true },
    birthOfDate: { type: String, require: true },
    userName: { type: String },
    password: { type: String },
    background: {
      type: String,
      default: "img/background-default.jpeg",
    },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("User", schema);
