const JOI = require("@hapi/joi");

const authSchema = JOI.object({
    email: JOI.string().email().lowercase().required(),
    password: JOI.string().min(2).required(),
});

module.exports = {
    authSchema,
};
