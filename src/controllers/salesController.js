import client from '../model/data/db';
import {
    checkSchema,
    createSaleSchema
} from './validation';
export default class recordController {
    static getHomePage(req, res) {

        client.many('SELECT * FROM orders')
            .then((data) => {
                res.status(200).send({
                    message: 'All orders retrieved successfully',
                    data
                });
            })
            .catch(() => {
                res.status(404).send({
                    message: 'Data not available',
                });
            });
    }

    static postSale(req, res) {
        createSaleSchema.validate(req.body, {
                abortEarly: false
            })
            .then(validatedCredentials => {
                client.one('INSERT INTO orders(id, attendant, category, product, quantity, price) VALUES($1, $2, $3, $4, $5, $6) RETURNING *', [Date.now(), validatedCredentials.attendant, validatedCredentials.category, validatedCredentials.product, validatedCredentials.quantity, validatedCredentials.price])
                    .then((data) => {
                        res.status(200).send({
                            message: 'Order created successfully',
                            order: {
                                id: data.id,
                                attendant: data.attendant,
                                category: data.category,
                                product: data.product,
                                quantity: data.quantity,
                                unitPrice: data.price
                            }
                        });

                    })
                    .catch((error) => {
                        res.status(404).send({
                            message: error
                        });
                    });

            })
            .catch(validationError => {
                    const errorMessage = validationError.details.map(d => d.message);
                    res.status(400).send(errorMessage);
            });
    }

    static getRecordById(req, res) {
        checkSchema.validate(req.params, {
                abortEarly: false
            })
            .then(validatedId => {
                client.one('SELECT * FROM orders WHERE id = $1', [validatedId.id])
                    .then(function (order) {
                        return res.status(200).send({
                            message: 'Order retrieved successfully',
                            order
                        });

                    })
                    .catch(function () {
                        res.status(404).send({
                            message: 'Order does not exist'
                        });
                    });
            })
            .catch(validationError => {
                    const errorMessage = validationError.details.map(d => d.message);
                    res.status(400).send(errorMessage);
            });
    }

}