import express from "express";
import {
  getUser,
  createUser,
  updateUser,
  loginUser, uploadImage,
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
export default router;
