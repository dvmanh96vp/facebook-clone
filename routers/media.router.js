import express from "express";
import {getMedia} from "../controllers/media.controller.js";


const router = express.Router();
router.get("/:id", getMedia);

export default router;