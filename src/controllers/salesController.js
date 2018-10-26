import salesDB from "../model/data/mockRecordDb";
export default class recordController {
    static getHomePage(req, res) {
        return res.status(200).json({
            message: "success",
            salesDB
        });
    };

    static postSale(req, res) {
        const attendant = req.body.attendant;
        if (attendant === "attendant 1" || "attendant 2" || "attendant 3") {
            if (!req.body.category || typeof req.body.category !== "string") {
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
            if (!req.body.price || typeof req.body.price !== "number") {
                return res.send({
                    message: "Price is required or invalid parameter"
                });
            }

            if (req.body.category && req.body.name && req.body.quantity && req.body.price) {
                const createdOrder = {
                    id: Date.now(),
                    sales: {
                        attendant: req.body.attendant,
                        product: req.body.product,
                        category: req.body.category,
                        quantity: req.body.quantity,
                        price: req.body.price,
                        date: new Date()
                    }
                };
                salesDB.unshift(createdOrder);
                return res.send({
                    message: "Order added successfully",
                    createdOrder
                });
            }

        } else {
            return res.send({
                message: "Access denied or invalid parameter"
            });
        }
    };

    static getRecordById(req, res) {
        const id = parseInt(req.params.id);
        let shouldExit = false;
        salesDB.map((order) => {
            if (order.id === id) {
                shouldExit = true;
                return res.status(200).send({
                    success: "true",
                    message: "Order retrieved successfully",
                    order,
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