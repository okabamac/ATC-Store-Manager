import client from '../model/data/db';
import {
    createUserSchema,
    checkLoginSchema
} from './validation';

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
                                        'INSERT INTO users (first_name, last_name, birth_year, email, username, password) VALUES($1, $2, $3, $4, $5, $6)',
                                        [
                                            validatedCredentials.first_name,
                                            validatedCredentials.last_name,
                                            date,
                                            validatedCredentials.mail,
                                            validatedCredentials.username,
                                            hash
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
                    .query('SELECT email, password FROM users WHERE email=($1)', [validatedCredentials.mail])
                    .then((data) => {
                        bcrypt.compare(validatedCredentials.password, data[0].password, function (err, yes) {
                            if (yes) {
                                return res.status(200).send({
                                    message: 'You are now signed in'
                                });
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