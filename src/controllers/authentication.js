// // function isAuthenticated(req, res, next) {
// //     // do any checks you want to in here

// //     // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
// //     // you can do this however you want with whatever variables you set up
// //     if (req.user.authenticated)
// //         return next();

// //     // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
// //     res.redirect('/');
// // }
// import bcrypt from 'bcrypt';
// import {
//     attendants,
//     admins
// } from '../model/data/users';


// export default class Authenticated {
//     static postProduct(req, res, next) {
//         const enteredPassword = bcrypt.hash(req.body.password, 6).then((hash) => {
//             return hash;
//         });
//         enteredPassword.then(function (result) {
//             console.log(result) //will log results.
//         });
//         admins.map((admin) => {
//             if (req.body.username == admin.username && enteredPassword == admin.password) {
//                 return next();
//             }
//         });
//         return res.status(400).send({
//             message: 'Invalid  username or password'
//         });
//     }

// }