import express from "express";
import {
  getPosts,
  createPost,
  updatePost,
} from "../controllers/posts.controller.js";
const router = express.Router();

router.get("/", getPosts);
router.post("/create", createPost);
router.post("/update", updatePost);
export default router;
