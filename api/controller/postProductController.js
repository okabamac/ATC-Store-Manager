import productDB from "../model/data/mockProductDb";
export default class postProductController {
    static postProduct(req, res) {
        const password = parseInt(req.params.password);
        if (password === 123) {
            if (!req.params.category) {
                return res.send({
                    message: "Category is required or invalid parameter"
                });
            }
            if (!req.params.name) {
                return res.send({
                    message: "Name is required or invalid parameter"
                });
            }

            if (!req.params.quantity) {
                return res.send({
                    message: "Quantity is required or invalid parameter"
                });
            }
            if (!req.params.price) {
                return res.send({
                    message: "Price is required or invalid parameter"
                });
            }

            if (req.params.category && req.params.name && req.params.quantity && req.params.price) {
                const createdProduct = {
                    id: Date.now(),
                    product: {
                        category: req.params.category,
                        name: req.params.name,
                        quantity: req.params.quantity,
                        price: req.params.price
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