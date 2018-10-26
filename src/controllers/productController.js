import productDB from "../model/data/mockProductDb";
export default class ProductController {
    static getHomePage(req, res) {
        return res.status(200).json({
            message: "success",
            productDB
        });
    }

    static postProduct(req, res) {
        const password = parseInt(req.body.password);
        if (password === 123) {
            if (!req.body.category || typeof req.body.category != "string") {
                return res.send({
                    message: "Category is required or invalid parameter"
                });
            }
            if (!req.body.name || typeof req.body.name !== "string") {
                return res.send({
                    message: "Name is required or invalid parameter"
                });
            }

            if (!req.body.quantity || typeof req.body.quantity !== "number") {
                return res.send({
                    message: "Quantity is required or invalid parameter"
                });
            }
            if (!req.body.price || typeof req.body.quantity !== "number") {
                return res.send({
                    message: "Price is required or invalid parameter"
                });
            }

            if (
                req.body.category &&
                req.body.name &&
                req.body.quantity &&
                req.body.price
            ) {
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


    static getProductById(req, res) {
        const id = parseInt(req.params.id);
        let shouldExit = false;
        productDB.map((product) => {
            if (product.id === id) {
                shouldExit = true;
                return res.status(200).send({
                    success: "true",
                    message: "Product retrieved successfully",
                    product,
                });
            }
        });
        if (!shouldExit) {
            return res.send({
                message: "Invalid ID"
            });
        }
    }
}