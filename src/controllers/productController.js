import productDB from "../model/data/mockProductDb";
import users from "../model/data/users"
import Joi from "joi";
import {
    editUserSchema,
    createUserSchema,
    checkIdSchema,
    createProductSchema,
} from "./validation";
import {
    runInNewContext
} from "vm";
export default class ProductController {
    static getHomePage(req, res) {
        return res.status(200).json({
            message: "success",
            productDB
        });
    }

    static postProduct(req, res) {
        let exit = false;
        createProductSchema.validate(req.body, {
                abortEarly: false
            })
            .then(validatedCredentials => {
                exit = true;
                const createdProduct = {
                    id: Date.now(),
                    product: {
                        category: validatedCredentials.category,
                        product: validatedCredentials.product,
                        quantity: validatedCredentials.quantity,
                        price: validatedCredentials.price,
                        url: validatedCredentials.url,
                        date: new Date(Date.now() - 15000000)
                    }
                };
                productDB.unshift(createdProduct);
                return res.send({
                    message: "Product added successfully",
                    createdProduct
                });

            })
            .catch(validationError => {
                if (exit == false) {
                    const errorMessage = validationError.details.map(d => d.message);
                    res.status(400).send(errorMessage);
                }
            });
    }


    static getProductById(req, res) {
        let exit = false;
        checkIdSchema.validate(req.params, {
                abortEarly: false
            })
            .then(validatedId => {
                productDB.find(product => {
                    if (product.id === validatedId.id) {
                        exit = true;
                        res.status(200).send({
                            success: true,
                            message: "Product retrieved successfully",
                            product
                        });
                    }
                });
                res.status(200).send({
                    message: "Product does not exist"
                });
            })
            .catch(validationError => {
                if (exit == false) {
                    const errorMessage = validationError.details.map(d => d.message);
                    res.status(400).send(errorMessage);
                }
            });
    }

    static editProductById(req, res) {
        const {
            id
        } = req.params;
        const {
            category,
            name,
            quantity,
            price,
            size,
            url
        } = req.body;

        const productToEdit = productDB.find(product => product.id == id);
        if (productToEdit) {
            ["category", "name", "quantity", "price", "size", "url"].forEach(key => {
                if (req.body[key]) productToEdit[key] = req.body[key];
            });
            res.status(200).send({
                productToEdit
            });
        } else {
            res.status(200).send({
                message: "Product does not exist"
            });
        }

    }

    static deleteProductById(req, res) {
        const {
            id
        } = req.params;

        const index = productDB.findIndex(product => product.id == id);
        if (index>0) {
            productDB.splice(index, 1);
            res.status(200).send({
                productDB
            });
        } else {
            res.status(200).send({
                message: "Product does not exist"
            });
        }

    }




    // static sendForm(req, res) {
    //     return res.sendFile(__controllers + '/form.html');
    // }
}