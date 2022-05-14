import mongoose from "mongoose";

const schema = mongoose.Schema({
    user_id_request: {
        type: String,
        require: true,
    },
    user_id_accept: {
        type: String,
        require: true
    }
})

export const FriendModel = mongoose.model('Friend',schema)