const Joi = require("joi");

// Password & ObjectID validation.
const { objectId } = require("./custom.validation");

const createATask = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
  }),
};

const updateATask = {
  path: Joi.object().keys({
    taskId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
  }),
};

const deleteATask = {
  path: Joi.object().keys({
    taskId: Joi.string().custom(objectId).required(),
  }),
};

module.exports = {
  createATask,
  updateATask,
  deleteATask
};
