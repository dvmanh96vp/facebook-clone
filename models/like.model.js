import mongoose from "mongoose";

const schema = mongoose.Schema({
    post_id: {
        type: String,
        require: true,
    },
    user_id: {
        type: String,
        require: true
    },
}, { timestamps: true })

export const LikeModel = mongoose.model('Like',schema)