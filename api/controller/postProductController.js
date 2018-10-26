import productDB from "../model/data/mockProductDb";
export default class postProductController {
    static postProduct(req, res) {
        const password = parseInt(req.body.password);
        if (password === 123) {
            if (!req.body.category) {
                return res.send({
                    message: "Category is required or invalid parameter"
                });
            }
            if (!req.body.name) {
                return res.send({
                    message: "Name is required or invalid parameter"
                });
            }

            if (!req.body.quantity) {
                return res.send({
                    message: "Quantity is required or invalid parameter"
                });
            }
            if (!req.body.price) {
                return res.send({
                    message: "Price is required or invalid parameter"
                });
            }

            if (req.body.category && req.body.name && req.body.quantity && req.body.price) {
                const createdProduct = {
                    id: Date.now(),
                    product: {
                        category: req.body.category,
                        name: req.body.name,
                        quantity: req.body.quantity,
                        price: req.body.price
                    }
                };
                productDB.unshift(createdProduct);
                return res.send({
                    message: "Product added successfully",
                    createdProduct
                });
            }

        } else {
            return res.send({
                message: "Access denied or invalid password"
            });
        }
    }
}