import express from "express";
let router = express.Router();
import Authenticated from "../controllers/authentication";
import ProductController from "../controllers/productController";
//Handle GET request for all products
router.get("/", Authenticated.adminAuth, ProductController.getHomePage);

//Handle GET request for a particular product/byId
router.get("/:id", Authenticated.adminAuth, ProductController.getProductById);

//Handle Post Request for Products
router.post("/", Authenticated.adminAuth, ProductController.postProduct);

//Handle Edit Request for a PArticular Product
router.put("/:id", Authenticated.adminAuth, ProductController.editProductById);

//Handle Delete Request for a Particular Product
router.delete("/:id", Authenticated.adminAuth, ProductController.deleteProductById);

export default router;