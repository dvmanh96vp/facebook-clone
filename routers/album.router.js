import multer from "multer";
import router from "./user.router.js";
import {createAlbum, deleteImage, getAlbum, updateAlbum} from "../controllers/album.controller.js";
const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, 'public/img');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
})
const upload = multer({storage: storage});

router.get("/", getAlbum);
router.post("/add",upload.single('img'), createAlbum);
router.post("/delete",upload.single('img'), deleteImage);

