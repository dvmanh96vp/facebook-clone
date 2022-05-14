import mongoose from "mongoose";

const schema = mongoose.Schema({
    user_id: {
        type: String,
        require: true,
    },
    album: [{
        type: String,
        require: true
    }],
}, { timestamps: true })

export const AlbumModel = mongoose.model('Album',schema)