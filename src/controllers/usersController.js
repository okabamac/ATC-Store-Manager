import client from '../model/data/db';
import {
    createUserSchema,
    checkLoginSchema
} from './validation';
const jwt = require('jsonwebtoken');
import bcrypt from 'bcrypt';
const saltRounds = 10;
export default class UsersController {
    static signup(req, res) {
        createUserSchema
            .validate(req.body, {
                abortEarly: false
            })
            .then(validatedCredentials => {
                client
                    .query('SELECT email FROM users WHERE email=($1)', [validatedCredentials.mail])
                    .then((email) => {
                        if (email == '') {
                            bcrypt.hash(validatedCredentials.password, saltRounds, (err, hash) => {
                                const date = validatedCredentials.birthYear.toString().split(" ").slice(0, 4).join(" ");
                                client
                                    .query(
                                        'INSERT INTO users (first_name, last_name, birth_year, email, password, admin) VALUES($1, $2, $3, $4, $5, $6)',
                                        [
                                            validatedCredentials.first_name,
                                            validatedCredentials.last_name,
                                            date,
                                            validatedCredentials.mail,
                                            hash,
                                            validatedCredentials.admin
                                        ]
                                    )
                                    .then(() => {
                                        res.status(200).send({
                                            message: 'User added successfully'
                                        });
                                    })
                                    .catch(error => {
                                        res.status(401).send({
                                            message: error.query
                                        });
                                    });
                            });
                        } else {
                            return res.status(401).send({
                                message: 'Email already exist'
                            });
                        }


                    })
                    .catch((err) => {
                        res.status(401).send({
                            message: err.query
                        });
                    });

            })
            .catch(validationError => {
                const errorMessage = validationError.details.map(d => d.message);
                res.status(400).send(errorMessage);
            });
    }

    static login(req, res) {
        checkLoginSchema
            .validate(req.body, {
                abortEarly: false
            })
            .then(validatedCredentials => {
                client
                    .query('SELECT email, password, admin FROM users WHERE email=($1)', [validatedCredentials.mail])
                    .then((data) => {
                        bcrypt.compare(validatedCredentials.password, data[0].password, function (err, yes) {
                            if (yes) {
                                const token = jwt.sign({
                                    email: data[0].email,
                                    userId: data[0].id
                                }, '^^*&&*)**@(2863448533', {
                                    expiresIn: '1h'
                                });
                                if(data[0].admin == 'admin'){
                                    res.redirect(303, '/enestoresmanager/pages/home1.html');
                                    return;
                                }
                                res.redirect(303, '/enestoresmanager/pages/home2.html');
                                return;
                            } else {
                                return res.status(201).send({
                                    message: 'Incorrect password'
                                });
                            }
                        });

                    })
                    .catch(() => {
                        return res.status(401).send({
                            message: 'Email does not exist'
                        });
                    });

            })
            .catch(validationError => {
                const errorMessage = validationError.details.map(d => d.message);
                res.status(400).send(errorMessage);
            });


    }
}