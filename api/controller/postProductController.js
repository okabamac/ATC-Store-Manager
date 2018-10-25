import productDB from "../model/data/mockProductDb";
export default class postProductController {
    static postProduct(req, res) {
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
        const product = {
            id: Date.now(),
            title: req.body.title,
            description: req.body.description
        }
        productDB.push(product);
        return res.status(201).send({
            success: 'true',
            message: 'Product added successfully',
            product
        });
    }
}