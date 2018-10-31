import express from "express";
import productController from "../controllers/productController";
let router = express.Router();
import authenticated from "../controllers/authentication";
//Handle GET request for all products
router.get("/", productController.getHomePage);

//Handle GET request for a particular product/byId
router.get("/:id", productController.getProductById);

//Handle Post Request for Products
router.post("/", authenticated.postProduct, productController.postProduct);

//Edit

//router.patch("/:id(\\d+)", productController.editProduct);

export default router;