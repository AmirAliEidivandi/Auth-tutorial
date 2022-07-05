const JWT = require("jsonwebtoken");
const createError = require("http-errors");

module.exports = {
    signAccessToken: (userId) => {
        return new Promise((resolve, reject) => {
            const payload = {};
            const secret = process.env.ACCESS_TOKEN_SECRET;
            const option = {
                expiresIn: "20s",
                issuer: "pickurpage.com",
                audience: userId,
            };

            JWT.sign(payload, secret, option, (err, token) => {
                if (err) {
                    console.log(err.message);
                    // return reject(err);
                    return reject(createError.InternalServerError());
                }
                resolve(token);
            });
        });
    },
    verifyAccessToken: (req, res, next) => {
        if (!req.headers["authorization"]) return next(createError.Unauthorized());
        const authHeader = req.headers["authorization"];
        const bearerToken = authHeader.split(" ");
        const token = bearerToken[1];
        JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
            if (err) {
                const message = err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
                return next(createError.Unauthorized(message));
            }

            req.payload = payload;
            next();
        });
    },
};
