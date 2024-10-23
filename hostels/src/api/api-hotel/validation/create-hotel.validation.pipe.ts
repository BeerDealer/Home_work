import {
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ObjectSchema } from 'joi';
import { ICreateHotelDto } from '../interfaces/dto/hotel-create.dto';

@Injectable()
export class CreateHotelValidationPipe implements PipeTransform {
  constructor(private readonly schema: ObjectSchema) {}

  public transform(value: ICreateHotelDto) {
    const { error } = this.schema.validate(value);

    if (error) {
      throw new HttpException(error.details[0].message, HttpStatus.BAD_REQUEST);
    }

    return value;
  }
}
