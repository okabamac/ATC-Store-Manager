import express from "express";
let router = express.Router();
import productDB from "../model/data/mockProductDb";

//Handle GET request for all products
router.get("/", (req, res, next) => {
    res.status(200).json({
        message: "success",
        productDB
    });
});

//Handle GET request for a particular product/byId
router.get("/:productId", (req, res, next) => {
    const id = parseInt(req.params.id);
    productDB.map((product) => {
        if (product.id === id) {
            return res.status(200).send({
                success: "true",
                message: "Product retrieved successfully",
                product,
            });
        }
    });
    return res.status(404).send({
        success: "false",
        message: "Product does not exist",
    });
});

//Handle Post Request for Products
router.post("/", (req, res, next) => {
    let reply = {};
    const password = req.body.password;
    if (password === "1234") {
        if (
            req.body.category &&
            req.body.name &&
            req.body.quantity &&
            req.body.price
        ) {
            const myProduct = {
                id: Date.now(),
                product: {
                    category: req.body.category,
                    name: req.body.name,
                    quantity: req.body.quantity,
                    price: req.body.price,
                }
            };
            reply = {
                message: "Your product has been added successfully",
                createdProduct: myProduct
            };
            productDB.push(reply.createdProduct);
        } else {
            reply = {
                message: "Missing fields not allowed"
            };
        }
        res.status(200).json(reply);
    } else {
        res.status(200).json({
            message: "Your password is wrong or you don't have access"
        });
    }
});

export default router;