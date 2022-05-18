import mongoose from "mongoose";

const schema = new mongoose.Schema({
    userId: {
        type: String, required: true,
    },
    desc: {
        type: String,
    },
    media: [String],
    likes: {
        type: Array,
        default: []
    }

}, {timestamps: true});

export const PostModel = mongoose.model("Posts", schema);
