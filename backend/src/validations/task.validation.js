const Joi = require("joi");

// Password & ObjectID validation.
const { objectId } = require("./custom.validation");

const createATask = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
  }),
};

module.exports = {
  createATask,
};
