import express from "express";
let router = express.Router();
import salesDB from "../model/data/mockRecordDb";

//Handle GET request for all sales
router.get("/", (req, res, next) => {
    res.status(200).json({
        message: "success",
        salesDB
    });
});

//Handle GET Request for a specific order
router.get("/:saleId", (req, res, next) => {
    const id = parseInt(req.params.saleId);
    salesDB.map((order) => {
        if (order.id === id) {
            return res.status(200).send({
                success: "true",
                message: "Product retrieved successfully",
                order,
            });
        }
    });
    return res.status(404).send({
        success: "false",
        message: "ID does not exist",
    });
});

//Handle Post Request for Sales
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
            const myOrder = {
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
                createdOrder: myOrder
            };
            salesDB.push(reply.createdOrder);
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