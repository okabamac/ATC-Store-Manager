import express from 'express';
import productRoutes from './src/routes/products';
import salesRoutes from './src/routes/sales';
import usersRoutes from './src/routes/user';
import pagesRoutes from './src/routes/pages';
import bodyParser from 'body-parser';
import multer from 'multer';
import session from 'session';
import cors from 'cors';
const upload = multer();
const app = express();
const path = require('path');

//for CORS
app.use(cors());

// app.use(session({
//     secret: '^^*&&*)**@(2863448533'
// }));
// for parsing application/xwww-
app.use(
    express.urlencoded({
        extended: true
    })
);

// https://www.google.com.ng/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwiBnYHnqvfeAhXox4UKHaJ7CvYQjRx6BAgBEAU&url=https%3A%2F%2Fwww.shoecarnival.com%2Fwomens_adidas_cloudfoam_qt_racer_sneakers%2F92057.html&psig=AOvVaw2qZUXdikhHu5WA_U1AJ_Vq&ust=1543502967831767

app.use(express.static(path.join(__dirname, 'public/ui')));
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

//views

// for parsing application/json
app.use(bodyParser.json());
// for parsing multipart/form-data
app.use(upload.array());
app.use('/enestoresmanager', pagesRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/sales', salesRoutes);
app.use('/api/v1/users', usersRoutes);

export default app;