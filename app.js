import express from "express";
import productRoutes from "./src/routes/products";
import salesRoutes from "./src/routes/sales";
import bodyParser from "body-parser";
import multer from "multer";
const upload = multer();
const app = express();


// app.set("view engine", "html");
// app.engine("html", hbs.__express);

// for parsing application/xwww-
app.use(
    express.urlencoded({
        extended: false
    })
);

// for parsing application/json
app.use(bodyParser.json());

// for parsing multipart/form-data
app.use(upload.array());
app.use(express.static("public"));


app.use("/api/v1/products", productRoutes);
app.use("/api/v1/sales", salesRoutes);

export default app;