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
    comment_text: {
        type: String
    }
}, { timestamps: true })

export const CommentModel = mongoose.model('Comment',schema)