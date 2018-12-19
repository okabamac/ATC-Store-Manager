import express from "express";
let router = express.Router();
import Authenticated from "../controllers/authentication";
import ProductController from "../controllers/productController";
import multer from 'multer';
const path = require('path');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../public/ui/img/uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({
    storage: storage
});

//Handle GET request for all products
router.get("/", ProductController.getHomePage);

//Handle GET request for a particular product/byId
router.get("/:id", ProductController.getProductById);

//Handle Post Request for Products
router.post("/", upload.single('image'), ProductController.postProduct);

//Handle Edit Request for a PArticular Product
router.put("/:id", ProductController.editProductById);

//Handle Delete Request for a Particular Product
router.delete("/:id", ProductController.deleteProductById);

export default router;