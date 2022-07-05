const express = require("express");
const morgan = require("morgan");
const createError = require("http-errors");
require("dotenv").config();
const app = express();
const authRouter = require("./routes/auth.routes");
require("./helpers/init_mongodb");
const { verifyAccessToken } = require('./helpers/jwt_helper');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/auth", authRouter);
app.get("/", verifyAccessToken, (req, res) => {
    res.send("hello world");
});

app.use(async (req, res, next) => {
    next(createError.NotFound());
});

app.use(async (err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        },
    });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
