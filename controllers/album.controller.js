import {AlbumModel} from "../models/album.model.js";
import jwt from "jsonwebtoken";
import {decodeToken} from "../shared/decode-token.js";
const { sign } = jwt;

export const getAlbum = async (req, res) => {
    try {
        const userId = req.query.user_id;
        const album = await AlbumModel.findOne({_id: userId});
        res.status(200).json(album);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const createAlbum = async (req, res) => {
    try {


        const newAlbum = new AlbumModel(album);
        await newAlbum.save();
        res.status(200).json(album);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const deleteImage = async (req, res) => {
    try {
        const userId = req.query.user_id;
        const album = await AlbumModel.findOne({_id: userId});
        res.status(200).json(album);
    } catch (error) {
        res.status(500).json(error);
    }
};