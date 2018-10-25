import express from "express";
let router = express.Router();
import allProductController from "../controller/allProductController";
import productByIdController from "../controller/productByIdController";
import postProductController from "../controller/postProductController";
//Handle GET request for all products
router.get("/", allProductController.getHomePage);

//Handle GET request for a particular product/byId
router.get("/:id", productByIdController.getProductById);

//Handle Post Request for Products
router.post("/", postProductController.postProduct);

export default router;