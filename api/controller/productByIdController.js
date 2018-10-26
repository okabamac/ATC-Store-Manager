import productDB from "../model/data/mockProductDb";

export default class productByIdController {
    static getProductById(req, res) {
        const id = parseInt(req.params.id);
        productDB.map((product) => {
            if (product.id === id) {
                return res.status(200).send({
                    success: "true",
                    message: "product retrieved successfully",
                    product,
                });
            }
        });
        return res.status(404).end();
    }
}