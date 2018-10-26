import express from "express";
import productController from "../controllers/productController";
let router = express.Router();

//Handle GET request for all products
router.get("/", productController.getHomePage);

//Handle GET request for a particular product/byId
router.get("/:id", productController.getProductById);

//Handle Post Request for Products
router.post("/", productController.postProduct);

export default router;