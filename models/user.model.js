import mongoose from "mongoose";

const schema = mongoose.Schema({
    firstName: {type: String, require: true},
    lastName: {type: String, require: true},
    avatar: {
        type: String, default: "img/avatar-default.png",
    },
    gender: {type: String, require: true},
    birthOfDate: {type: String, require: true},
    userName: {type: String, require: true, min: 3, max: 25,},
    password: {type: String, require: true, min: 8},
    background: {
        type: String, default: "img/background-default.jpeg",
    },
    other: {
        type: Object
    },
    friend_accept: {type: Array, default: []},
    friend_request: {type: Array, default: []},
    follower: {type: Array, default: []},
    album: {type: Array, default:[]}
}, {timestamps: true});

export const UserModel = mongoose.model("User", schema);
