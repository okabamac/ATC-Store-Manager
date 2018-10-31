import salesDB from "../model/data/mockRecordDb";
import Joi from "joi";
import {
    editUserSchema,
    createUserSchema,
    checkIdSchema,
    createSaleSchema
} from "./validation";
export default class recordController {
    static getHomePage(req, res) {
        return res.status(200).json({
            message: "success",
            salesDB
        });
    }

    static postSale(req, res) {
        let exit = false;
        createSaleSchema.validate(req.body, {
                abortEarly: false
            })
            .then(validatedCredentials => {
                exit = true;
                const createdOrder = {
                    id: Date.now(),
                    sales: {
                        attendant: validatedCredentials.attendant,
                        category: validatedCredentials.category,
                        product: validatedCredentials.product,
                        quantity: validatedCredentials.quantity,
                        price: validatedCredentials.price,
                        date: new Date(Date.now() - 15000000)
                    }
                };
                salesDB.unshift(createdOrder);
                return res.send({
                    message: "Order added successfully",
                    createdOrder
                });

            })
            .catch(validationError => {
                if (exit == false) {
                    const errorMessage = validationError.details.map(d => d.message);
                    res.status(400).send(errorMessage);
                }
            });
    }

    static getRecordById(req, res) {
        let exit = false;
        checkIdSchema.validate(req.params, {
                abortEarly: false
            })
            .then(validatedId => {
                salesDB.map((order) => {
                    if (order.id === validatedId.id) {
                        exit = true;
                        res.status(200).send({
                            success: true,
                            message: "Order retrieved successfully",
                            order
                        });
                    }
                });
                res.status(200).send({
                    message: "Order does not exist"
                });
            })
            .catch(validationError => {
                if (exit == false) {
                    const errorMessage = validationError.details.map(d => d.message);
                    res.status(400).send(errorMessage);
                }
            });
    }

}