import express from "express";
let router = express.Router();
import allRecordController from "../controller/allRecordController";
import postSaleController from "../controller/postSaleController";
import recordByIdController from "../controller/recordByIdController";
//Handle GET request for all products
router.get("/", allRecordController.getHomePage);

//Handle GET request for a particular record/byId

router.get("/:id", recordByIdController.getRecordById);

//Handle Post Request for Sales
router.post("/", postSaleController.postSale);

export default router;