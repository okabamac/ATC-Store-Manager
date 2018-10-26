import salesDB from "../model/data/mockRecordDb";
export default class postSaleController {
    static postSale(req, res) {
        const attendant = req.body.attendant;
        if (attendant === "attendant 1" || "attendant 2" || "attendant 3") {
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
    }
}