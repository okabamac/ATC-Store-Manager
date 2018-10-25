import salesDB from "../model/data/mockRecordDb";
export default class recordByIdController {
    static getRecordById(req, res) {
        const id = parseInt(req.params.id);
        salesDB.map((order) => {
            if (order.id === id) {
                return res.status(200).send({
                    success: "true",
                    message: 'Order retrieved successfully',
                    order,
                });
            }
        });
        return res.status(404).end();
    }
}