import {
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ObjectSchema } from 'joi';
import { IUserCreateDto } from '../interfaces/dto/user-create.dto';

@Injectable()
export class UserValidationPipe implements PipeTransform {
  constructor(private readonly schema: ObjectSchema) {}

  public transform(body: IUserCreateDto) {
    const { error } = this.schema.validate(body);

    if (error) {
      throw new HttpException(error.details[0].message, HttpStatus.BAD_REQUEST);
    }
    return body;
  }
}
