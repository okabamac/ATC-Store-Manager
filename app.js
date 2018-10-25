import express from "express";
import productRoutes from './api/routes/products';
import salesRoutes from './api/routes/sales';
const app = express();
const bodyParser = require('body-parser');
app.use(express.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});


app.use('/api/v1/products', productRoutes);
app.use('/api/v1/sales', salesRoutes);

app.use((req, res, next) => {
    const error = new Error('Page Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});
export default app;