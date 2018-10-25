import salesDB from "../model/data/mockRecordDb";
export default class allRecordController {
    static getHomePage(req, res) {
        return res.status(200).json({
            message: "success",
            salesDB
        });
    }
}