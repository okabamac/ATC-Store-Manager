import express from "express";
let router = express.Router();
import authenticated from "../controllers/authentication";
import ProductController from "../controllers/productController";
//Handle GET request for all products
router.get("/", ProductController.getHomePage);

//Handle GET request for a particular product/byId
router.get("/:id", ProductController.getProductById);

//Handle Post Request for Products
router.post("/", authenticated.postProduct, ProductController.postProduct);

//Handle Edit Request for a PArticular Product
router.put("/:id", ProductController.editProductById);

//Handle Delete Request for a Particular Product
router.delete("/:id", ProductController.deleteProductById);

// router.get("/form", ProductController.sendForm);
//Edit

//router.patch("/:id(\\d+)", productController.editProduct);

export default router;