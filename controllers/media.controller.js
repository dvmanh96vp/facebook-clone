import {UserModel} from "../models/user.model.js";

export const getMedia = async (req, res) => {
    try {
        const {page , size} = req.query;
        const userId = req.params.id;
        const users = await UserModel.findById(userId);
        let listFile;
        let amount = size < 9 ? size : 9;

        if(page * amount >= users.album.length) {
            listFile = users.album.slice((page - 1) * amount, users.album.length)
        } else {
            listFile = users.album.slice((page - 1) * amount, page * amount)
        }
        res.status(200).json({list: listFile, total: users.album.length});
    } catch (error) {
        res.status(500).json(error);
    }
};