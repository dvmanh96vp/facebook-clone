import express from "express";
import {
  getUser,
  createUser,
  updateUser,
  loginUser,
} from "../controllers/user.controller.js";
const router = express.Router();

router.get("/", getUser);
router.post("/create", createUser);
router.post("/update", updateUser);
router.post("/login", loginUser);
export default router;
