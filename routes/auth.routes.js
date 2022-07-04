const router = require("express").Router();
const createError = require("http-errors");
const User = require("../models/user.model");
const { authSchema } = require("../helpers/validation_schema");

router.post("/register", async (req, res, next) => {
    try {
        // const { email, password } = req.body;
        // if (!email || !password) throw createError.BadRequest();
        const result = await authSchema.validateAsync(req.body);

        const doesExist = await User.findOne({ email: result.email });
        if (doesExist) throw createError.Conflict(`${result.email} is already been registered`);

        const user = new User(result);
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (error) {
        if (error.isJoi) error.status = 422;
        next(error);
    }
});

router.post("/login", async (req, res, next) => {
    res.send("login page");
});

router.post("/refresh-token", async (req, res, next) => {
    res.send("refresh token page");
});

router.delete("/logout", async (req, res, next) => {
    res.send("logout page");
});

module.exports = router;
