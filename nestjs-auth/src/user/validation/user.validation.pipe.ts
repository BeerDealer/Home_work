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

  transform(data: IUserCreateDto): IUserCreateDto {
    const { error } = this.schema.validate(data);
    if (error) {
      throw new HttpException(
        error.details[0].message.replace(/\"/g, ''),
        HttpStatus.BAD_REQUEST,
      );
    }
    return data;
  }
}
