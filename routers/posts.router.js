import express from "express";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost
} from "../controllers/posts.controller.js";
const router = express.Router();
import multer from "multer";

const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, 'public/img');
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  }
})

const multiUpload = multer({storage: storage}).array('file', 10)
router.get("/:id", getPosts);
router.post("/create",multiUpload, createPost);
router.post("/update", updatePost);
router.post("/delete", deletePost);
export default router;
