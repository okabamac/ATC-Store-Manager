// function isAuthenticated(req, res, next) {
//     // do any checks you want to in here

//     // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
//     // you can do this however you want with whatever variables you set up
//     if (req.user.authenticated)
//         return next();

//     // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
//     res.redirect('/');
// }
import users from "../model/data/users";
export default class Authenticated {
    static postProduct(req, res, next) {
        console.log(req.body.password);
        users.map((user) => {
            if (req.body.username == user.username && req.body.password == user.password) {
                return next();
            }
        });
        return res.status(400).send({
            message: "Invalid  username or password"
        });
    }

}