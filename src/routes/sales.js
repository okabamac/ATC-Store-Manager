import express from "express";
import salesController from "../controllers/salesController";
import authenticated from "../controllers/authentication";
let router = express.Router();

//Handle GET request for all products
router.get("/", salesController.getHomePage);

//Handle GET request for a particular record/byId

router.get("/:id", salesController.getRecordById);

//Handle Post Request for Sales
router.post("/", salesController.postSale);

export default router;