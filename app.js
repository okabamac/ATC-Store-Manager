import express from "express";
import productRoutes from "./src/routes/products";
import salesRoutes from "./src/routes/sales";
import bodyParser from "body-parser";

const app = express();
app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

app.use("/api/v1/products", productRoutes);
app.use("/api/v1/sales", salesRoutes);

app.use((req, res, next) => {
    const error = new Error("Page Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});
export default app;