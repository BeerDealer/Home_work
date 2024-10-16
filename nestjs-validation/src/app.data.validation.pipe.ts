import {
  Injectable,
  PipeTransform,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { IBodyCreateDto } from './interfaces/dto/body-create.dto';

@Injectable()
export class AppDataValidationPipe implements PipeTransform {
  transform(data: IBodyCreateDto) {
    if (data.age < 18 || isNaN(data.age)) {
      throw new HttpException(
        'Your age must be more than 18 and number',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (data.password.length < 8) {
      throw new HttpException(
        'Password must be more than 8',
        HttpStatus.BAD_REQUEST,
      );
    }
    return data;
  }
}
