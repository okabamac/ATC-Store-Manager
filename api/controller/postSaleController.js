import salesDB from "../model/data/mockRecordDb";
export default class postSaleController {
    static postSale(req, res) {
        if (!req.body.title) {
            return res.status(400).send({
                success: 'false',
                message: 'title is required'
            });
        } else if (!req.body.description) {
            return res.status(400).send({
                success: 'false',
                message: 'description is required'
            });
        }
        const order = {
            id: Date.now(),
            title: req.body.title,
            description: req.body.description
        }
        salesDB.push(order);
        return res.status(201).send({
            success: 'true',
            message: 'order added successfully',
            order
        })
    }
}