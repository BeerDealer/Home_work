import * as Joi from 'joi';

export const signinValidationSchema = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
});
