import { UserModel } from "../models/user.model.js";
import jwt from "jsonwebtoken";
const { sign } = jwt;
export const getUser = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createUser = async (req, res) => {
  try {
    const newUser = req.body;
    const user = new UserModel(newUser);
    await user.save();
    const { userName, password, __v, ...objUser } = user._doc;
    const token = sign({ userName, password }, "shhhhh");
    res.status(200).json({ infor: objUser, token: token });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateUser = async (req, res) => {
  try {
    const update = req.body;
    const user = new UserModel.findOneAndUpdate({ _id: update._id }, update, {
      new: true,
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await UserModel.findOne({
      userName: userName,
      password: password,
    });
    if (user) {
      const { userName, password, __v, ...objUser } = user._doc;
      const token = sign({ userName, password }, "shhhhh");
      res.status(200).json({ infor: objUser, token: token });
    } else {
      res.status(401).json({
        error:
          "Email hoặc số điện thoại hoặc mật khẩu không đúng. Vui lòng kiểm tra lại",
      });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
