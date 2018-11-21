import express from 'express';
import productRoutes from './src/routes/products';
import salesRoutes from './src/routes/sales';
import usersRoutes from './src/routes/user';
import bodyParser from 'body-parser';
import multer from 'multer';
import cors from 'cors';
const upload = multer();
const app = express();

// import {
//     attendants,
//     admins
// } from './src/model/data/users';
// app.set('view engine', 'html');
// app.engine('html', hbs.__express);

//for CORS
app.use(cors());

// for parsing application/xwww-
app.use(
    express.urlencoded({
        extended: false
    })
);
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.code || 500)
            .json({
                status: 'error',
                message: err
            });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500)
        .json({
            status: 'error',
            message: err.message
        });
});

// for parsing application/json
app.use(bodyParser.json());

// for parsing multipart/form-data
app.use(upload.array());
app.use(express.static('public'));
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/sales', salesRoutes);
app.use('/api/v1/users', usersRoutes);

export default app;