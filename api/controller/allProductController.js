import productDB from "../model/data/mockProductDb";
export default class allProductController {
    static getHomePage(req, res) {
        return res.status(200).json({
            message: "success",
            productDB
        });
    }
}