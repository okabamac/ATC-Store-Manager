// import ' from '../model/data/mock'';
// import client from '../model/data/db';
// import Joi from 'joi';
// import {
//     editUserSchema,
//     createUserSchema,
//     checkIdSchema,
//     createProductSchema,
// } from './validation';
// import {
//     runInNewContext
// } from 'vm';
// export default class ProductController {
//     static getHomePage(req, res) {
//         return res.status(200).json({
//             message: 'success',
//             '
//         });
//     }

//     static postProduct(req, res) {
//         let exit = false;
//         createProductSchema.validate(req.body, {
//                 abortEarly: false
//             })
//             .then(validatedCredentials => {
//                 exit = true;
//                 const createdProduct = {
//                     id: Date.now(),
//                     product: {
//                         category: validatedCredentials.category,
//                         product: validatedCredentials.product,
//                         quantity: validatedCredentials.quantity,
//                         price: validatedCredentials.price,
//                         url: validatedCredentials.url,
//                         date: new Date(Date.now() - 15000000)
//                     }
//                 };
//                 '.unshift(createdProduct);
//                 return res.send({
//                     message: 'Product added successfully',
//                     createdProduct
//                 });

//             })
//             .catch(validationError => {
//                 if (exit == false) {
//                     const errorMessage = validationError.details.map(d => d.message);
//                     res.status(400).send(errorMessage);
//                 }
//             });
//     }


//     static getProductById(req, res) {
//         let exit = false;
//         checkIdSchema.validate(req.params, {
//                 abortEarly: false
//             })
//             .then(validatedId => {
//                 '.find(product => {
//                     if (product.id === validatedId.id) {
//                         exit = true;
//                         res.status(200).send({
//                             success: true,
//                             message: 'Product retrieved successfully',
//                             product
//                         });
//                     }
//                 });
//                 res.status(200).send({
//                     message: 'Product does not exist'
//                 });
//             })
//             .catch(validationError => {
//                 if (exit == false) {
//                     const errorMessage = validationError.details.map(d => d.message);
//                     res.status(400).send(errorMessage);
//                 }
//             });
//     }

//     static editProductById(req, res) {
//         const {
//             id
//         } = req.params;
//         const {
//             category,
//             name,
//             quantity,
//             price,
//             size,
//             url
//         } = req.body;

//         const productToEdit = '.find(product => product.id == id);
//         if (productToEdit) {
//             ['category', 'name', 'quantity', 'price', 'size', 'url'].forEach(key => {
//                 if (req.body[key]) productToEdit[key] = req.body[key];
//             });
//             res.status(200).send({
//                 productToEdit
//             });
//         } else {
//             res.status(200).send({
//                 message: 'Product does not exist'
//             });
//         }

//     }

//     static deleteProductById(req, res) {
//         const {
//             id
//         } = req.params;

//         const index = '.findIndex(product => product.id == id);
//         if (index>0) {
//             '.splice(index, 1);
//             res.status(200).send({
//                 '
//             });
//         } else {
//             res.status(200).send({
//                 message: 'Product does not exist'
//             });
//         }

//     }




//     // static sendForm(req, res) {
//     //     return res.sendFile(__controllers + '/form.html');
//     // }
// }

import client from '../model/data/db';
import {
    checkIdSchema,
    createProductSchema,
    checkUpdateSchema
} from './validation';
import {
    request
} from 'https';
export default class ProductController {
    static getHomePage(req, res) {

        client.many('SELECT * FROM products')
            .then((data) => {
                res.status(200).send({
                    message: 'All products retrieved successfully',
                    data
                });
            })
            .catch((error) => {
                res.status(404).send({
                    message: 'Data not available'
                });
            });
    }

    static postProduct(req, res) {
        let exit = false;
        createProductSchema.validate(req.body, {
                abortEarly: false
            })
            .then(validatedCredentials => {
                exit = true;
                client.one('INSERT INTO products(id, category, name, quantity, price, size, image_url) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *', [Date.now(), validatedCredentials.category, validatedCredentials.name, validatedCredentials.quantity, validatedCredentials.price, validatedCredentials.size, validatedCredentials.url])
                    .then((data) => {
                        res.status(200).send({
                            message: 'Product added successfully',
                            product: {
                                id: data.id,
                                category: data.category,
                                name: data.product,
                                quantity: data.quantity,
                                unitPrice: data.price,
                                size: data.size,
                                url: data.image_url
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
                client.one('SELECT * FROM products WHERE id = $1', [validatedId.id])
                    .then((product) => {
                        return res.status(200).send({
                            message: 'Product retrieved successfully',
                            product
                        });

                    })
                    .catch(() => {
                        res.status(404).send({
                            message: 'Product does not exist'
                        });
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
        checkUpdateSchema.validate(req.body, {
                abortEarly: false
            })
            .then(() => {
                const keys = ['category', 'name', 'quantity', 'price', 'size', 'image_url'];
                const fields = [];
                keys.forEach(key => {
                    if (req.body[key]) fields.push(key);
                });
                let index = 0;
                fields.forEach((field) => {
                    index = index++;
                    client.none(`UPDATE products SET ${field}=($1) WHERE id=($2)`,
                        [req.body[field], id]);
                });
                if (index === fields.length - 1) {
                    return res.status(200).send({
                        message: 'Product updated successfully'
                    });
                }
            })
            .catch(validationError => {
                const errorMessage = validationError.details.map(d => d.message);
                res.status(400).send(errorMessage);
            });
    }


    static deleteProductById(req, res, next) {
        const {
            id
        } = req.params;

        checkIdSchema.validate(req.params, {
                abortEarly: false
            })
            .then(() => {
                client.result('DELETE FROM products WHERE id=($1)', [id])
                .then(function (result) {
                    res.status(200)
                      .json({
                        status: 'success',
                        message: `Removed ${result.rowCount} product`
                      });
                  })
                  .catch(function (err) {
                    return next(err);
                  });
            })
            .catch(validationError => {
                const errorMessage = validationError.details.map(d => d.message);
                res.status(400).send(errorMessage);
            });
    }
}