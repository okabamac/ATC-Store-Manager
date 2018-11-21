// function isAuthenticated(req, res, next) {
//     // do any checks you want to in here

//     // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
//     // you can do this however you want with whatever variables you set up
//     if (req.user.authenticated)
//         return next();

//     // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
//     res.redirect('/');
// } 

import jsonwebtoken from "jsonwebtoken";
export default class Authenticated {
  static adminAuth(req, res, next) {

    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jsonwebtoken.verify(token, 'secret');
      req.userData = decoded;
      next();
    } catch (err) {
      return res.status(401).json({
        message: 'Auth failed'
      });
    }
    // if (!req.session.user_id) {
    //     res.send('You are not authorized to view this page');
    //   } else {
    //     next();
    //   }
  }


  // static userAuth(req, res, next) {
  //   if (!req.session.user_id) {
  //     res.send('You are not authorized to view this page');
  //   } else {
  //     next();
  //   }
  // }
}