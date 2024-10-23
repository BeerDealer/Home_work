import {
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ObjectSchema } from 'joi';
import { IUserSigninDto } from '../interfaces/dto/user-signin.dto';

@Injectable()
export class SigninValidationPipe implements PipeTransform {
  constructor(private readonly schema: ObjectSchema) {}

  public transform(value: IUserSigninDto): IUserSigninDto {
    const { error } = this.schema.validate(value);
    if (error) {
      throw new HttpException(error.details[0].message, HttpStatus.BAD_REQUEST);
    }

    return value;
  }
}
