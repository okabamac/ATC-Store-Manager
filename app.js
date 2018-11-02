import express from "express";
import productRoutes from "./src/routes/products";
import salesRoutes from "./src/routes/sales";
import usersRoutes from "./src/routes/user";
import bodyParser from "body-parser";
import multer from "multer";
const upload = multer();
const app = express();

import {
    attendants,
    admins
} from "./src/model/data/users";
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
app.use("/api/v1/users", usersRoutes);

export default app;