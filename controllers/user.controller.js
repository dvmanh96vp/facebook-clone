import { UserModel } from "../models/user.model.js";
import jwt from "jsonwebtoken";
const { sign } = jwt;

export const getUser = async (req, res) => {
  try {
    const userId = req.query.user_id;
    const users = await UserModel.findOne({_id: userId});
    const { userName, password, __v,updatedAt, createdAt, follower, friend_accept, friend_request, ...objUser } = users._doc;
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
    const { userName, password, __v, follower, friend_accept, friend_request, ...objUser } = user._doc;
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
      const { userName, password, __v,follower, friend_accept, friend_request, ...objUser } = user._doc;
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
    const file = req.file;
    if(file) {
      let update;
      const image = `img/${file.filename}`;
      if(req.body.type === 'avatar') {
        update = {
          avatar: image
        }
      } else {
        update = {
          background: image
        }
      }
      const user = await UserModel.findById(req.body.userId);
      user.update(update);
      if(!user.album.map(item => item.path).includes(image)) {
        user.album.push({path: image, type: file.mimetype});
      }
      await user.save();
      res.status(200).send({status: "success", message: "File created successfully"})
    }
  }catch (error) {
    res.status(500).json(error);
  }
}

export const requestFriend = async (req, res) => {
  try {
    const user = await UserModel.findById(req.body.userId);
    const userRequest= await UserModel.findById(req.body.idReq);
    await user.updateOne({$push: {friend_request: req.body.id}});
    await userRequest.updateOne({$push: {follower: req.body.userId}})
    res.status(200).json("request friend successfully");
  } catch (error) {
    res.status(500).json(error);
  }
}

export const acceptFriend = async  (req, res) => {
  try {
    const user = await UserModel.findById(req.body.userId);
    const userAcc= await UserModel.findById(req.body.idAcc);
    //remove
    await user.updateOne({$pull: {follower: req.body.idAcc}});
    await userAcc.updateOne({$pull: {friend_request: req.body.userId}});

    //add
    await user.updateOne({$push: {friend_accept: req.body.idAcc}});
    await userAcc.updateOne({$push: {friend_accept: req.body.userId}})
    res.status(200).json("request friend successfully");
  } catch (error) {
    res.status(500).json(error);
  }
}

export const getListFriend = async (req, res) => {
  try {
    const userId = req.params.id;
    const users = await UserModel.findOne({_id: userId});
    const { friend_accept } = users._doc;
    res.status(200).json({friend:friend_accept});
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getListFollower = async (req, res) => {
  try {
    const userId = req.params.id;
    const users = await UserModel.findOne({_id: userId});
    const {follower} = users._doc;
    res.status(200).json({follower});
  } catch (error) {
    res.status(500).json(error);
  }
};

