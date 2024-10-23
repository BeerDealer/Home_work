import * as Joi from 'joi';

export const CreateHotelValidationSchema = Joi.object().keys({
  title: Joi.string().required(),
  description: Joi.string().required(),
});
