import * as Joi from 'joi';

const authLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export default authLoginSchema;
