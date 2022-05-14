import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import posts from "./routers/posts.router.js";
import mongoose from "mongoose";
import user from "./routers/user.router.js";
import path from "path";
import dotenv from "dotenv";
import multer from "multer";

dotenv.config();
const app = express();
const URI = process.env.DATABASE_URL;
const PORT = process.env.PORT;
const __dirname = path.resolve();
const dir = path.join(__dirname, "/public");



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
app.use(cors());

app.use(express.static(dir));
app.use("/user", user);
app.use("/post", posts);

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connect to mongodb");
    app.listen(PORT, () => {
      console.log(`Server runing ${PORT}`);
    });
  })
  .catch((err) => console.log("error:", err));
