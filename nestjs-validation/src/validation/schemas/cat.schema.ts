import * as Joi from 'joi';

export const catValidationSchema = Joi.object().keys({
  name: Joi.string().min(2).required(),
  color: Joi.string()
    .allow('black', 'white', 'colorful')
    .lowercase()
    .required(),
  age: Joi.number().min(1).max(30).required(),
  weight: Joi.number().min(1).max(50),
});
