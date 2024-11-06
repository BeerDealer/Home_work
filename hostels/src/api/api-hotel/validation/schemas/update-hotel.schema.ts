import * as Joi from 'joi';

export const UpdateHotelValidationSchema = Joi.object().keys({
  title: Joi.string().required(),
  description: Joi.string().required(),
});
