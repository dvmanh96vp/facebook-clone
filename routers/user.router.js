import express from "express";
import {
  getUser,
  createUser,
  updateUser,
  loginUser, uploadImage, requestFriend, acceptFriend, getListFriend, getListFollower,
} from "../controllers/user.controller.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, 'public/img');
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  }
})

const upload = multer({storage: storage})
const router = express.Router();

router.get("/", getUser);
router.post("/create", createUser);
router.post("/update", updateUser);
router.post("/login", loginUser);
router.post("/upload", upload.single('img'), uploadImage);
router.post('/request-friend', requestFriend);
router.post('/accept-friend', acceptFriend);
router.get("/list-friend/:id", getListFriend);
router.get("/list-follower/:id", getListFollower);
export default router;
