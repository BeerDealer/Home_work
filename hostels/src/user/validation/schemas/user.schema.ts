import * as Joi from 'joi';
import { UserRole } from 'src/user/enums/role.enum';

export const userValidationSchema = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
  name: Joi.string().required(),
  contactPhone: Joi.string().required(),
  role: Joi.string()
    .valid(...Object.values(UserRole))
    .required(),
});
