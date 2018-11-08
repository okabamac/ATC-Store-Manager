
// import client from '../model/data/db';
// import {
//     createUserSchema,
// } from './validation';


// export default class UsersController {
//     static signup(req, res) {
//         let exit = false;
//         checkUserSchema.validate(req.body, {
//                 abortEarly: false
//             })
//             .then(validatedCredentials => {
               
//             })
//             .catch(validationError => {
//                 if (exit == false) {
//                     const errorMessage = validationError.details.map(d => d.message);
//                     res.status(400).send(errorMessage);
//                 }
//             });
//     }

//     static login(req, res) {

//     }
// }