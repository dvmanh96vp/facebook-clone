import { UserModel } from "../models/user.model.js";

export const getListFriend = async (req, res) => {
    try {
        const {page , size} = req.query;
        const userId = req.params.id;
        const users = await UserModel.findById(userId);
        let listFile;
        let amount = size < 9 ? size : 9;

        if(page * amount >= users.friend_accept.length) {
            listFile = users.friend_accept.slice((page - 1) * amount, users.friend_accept.length)
        } else {
            listFile = users.friend_accept.slice((page - 1) * amount, page * amount)
        }
        res.status(200).json({list: listFile, total: users.friend_accept.length});
    } catch (error) {
        res.status(500).json(error);
    }
}

export const requestFriend = async (req, res) => {
    try {
        const {userId, userIdReq} = req.body;
        const user = await UserModel.findById(userId);
        if(!user.friend_request.includes(userIdReq)) {
            user.update({$push: {friend_request: userIdReq}});
        }
        res.status(200).json('request friend successfully');
    } catch (error) {
        res.status(500).json(error);
    }
}


export const deleteFriend = async (req, res) => {
    try {
        const {userId, userIdReq} = req.body;
        const user = await UserModel.findById(userId);
        if(user.friend_accept.includes(userIdReq)) {
            user.update({$pull: {friend_accept: userIdReq}});
        }
        res.status(200).json('delete friend successfully');
    } catch (error) {
        res.status(500).json(error);
    }
}