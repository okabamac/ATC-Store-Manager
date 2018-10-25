import express from "express";
let router = express.Router();
import salesDB from "../model/data/mockRecordDb";

router.get("/", (req, res, next) => {
    res.status(200).json({
        message: "Handling GET request to /products"
    });
});
router.get("/:saleId", (req, res, next) => {
    const id = req.params.productId;
    if (id === "special") {
        res.status(200).json({
            message: "You discovered the special ID",
            id: id
        });
    } else {
        res.status(200).json({
            message: "You passed a wrong ID"
        });
    }
});
router.post("/", (req, res, next) => {
    res.status(200).json({
        message: "Handling POST request to /products"
    });
});

export default router;