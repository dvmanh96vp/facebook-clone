import { UserModel } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import {decodeToken} from "../shared/decode-token.js";
const { sign } = jwt;

export const getUser = async (req, res) => {
  try {
    const userId = req.query.user_id;
    const users = await UserModel.findOne({_id: userId});
    const { userName, password, __v,updatedAt, createdAt, ...objUser } = users._doc;
    res.status(200).json(objUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createUser = async (req, res) => {
  try {
    const newUser = req.body;
    const existedUser = await UserModel.findOne({userName: newUser.userName});
    if(existedUser) {
      res.status(500).json({message: 'existed username'});
      return;
    }
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
    const user = await UserModel.findOneAndUpdate({ _id: update._id }, update, {
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

export const uploadImage = async (req, res) => {
  try {
    const user = decodeToken(req.headers.authorization);
    const file = req.file;
    if(file) {
      let update;
      const image = `img/${file.filename}`;
      if(req.body.type === 'avatar') {
        update = {
          avatar: image,
        }
      } else {
        update = {
          background: image,
        }
      }
      await UserModel.findOneAndUpdate({ userName: user.userName }, update, {new: true});
      res.status(200).send({status: "success", message: "File created successfully"})
    }
  }catch (error) {
    res.status(500).json(error);
  }
}

