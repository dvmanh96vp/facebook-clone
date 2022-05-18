import express from "express";
import {deleteFriend, getListFriend, requestFriend} from "../controllers/friendship.controller.js";


const router = express.Router();
router.get("/:id", getListFriend);
router.post("/request", requestFriend);
router.post("/cancel", deleteFriend)

export default router;