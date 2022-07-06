const router = require("express").Router();
const { register, login, refreshToekn, logout } = require("../controllers/auth.controllers");

router.post("/register", register);

router.post("/login", login);

router.post("/refresh-token", refreshToekn);

router.delete("/logout", logout);

module.exports = router;
