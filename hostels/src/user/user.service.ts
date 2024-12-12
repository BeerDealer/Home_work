import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IUserService } from './interfaces/user-service.interface';
import { IUser } from './interfaces/user.interface';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Connection, Model } from 'mongoose';
import { ISearchUserParams } from './interfaces/search-user-params.interface';
import { ID } from '../types/id.type';
import { IUserCreateDto } from './interfaces/dto/user-create.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<UserDocument>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  public async findById(id: ID): Promise<User> {
    const user = await this.UserModel.findById(id);
    return user;
  }

  public async findByEmail(email: string): Promise<User> {
    const user = await this.UserModel.findOne({ email: email });
    if (!user) {
      throw new HttpException('Пользователь не найден', HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  public async findAll(params: ISearchUserParams): Promise<User[]> {
    const query: any = {};

    if (params.name) {
      query.name = { $regex: params.name, $options: 'i' };
    }
    if (params.email) {
      query.email = { $regex: params.email, $options: 'i' };
    }
    if (params.contactPhone) {
      query.contactPhone = { $regex: params.contactPhone, $options: 'i' };
    }

    const users = await this.UserModel.find(query)
      .select('-_id -__v')
      .skip(params.offset)
      .limit(params.limit);

    return users;
  }

  public async create(data: IUserCreateDto): Promise<User> {
    const saltOrRounds = 10;
    const password = data.password;
    const hash = await bcrypt.hash(password, saltOrRounds);
    const userData: Partial<User> = {
      passwordHash: hash,
      email: data.email,
      name: data.name,
      role: data.role,
    };
    try {
      const user = new this.UserModel(userData);
      return await user.save();
    } catch (err) {
      if (err.message.includes('E11000'))
        throw new HttpException('Email занят', HttpStatus.BAD_REQUEST);
      else throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
