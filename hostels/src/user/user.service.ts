import { Injectable } from '@nestjs/common';
import { IUserService } from './interfaces/user-service.interface';
import { IUser } from './interfaces/user.interface';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Connection, Model } from 'mongoose';
import { ISearchUserParams } from './interfaces/search-user-params.interface';
import { ID } from '../types/id.type';

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
    return user;
  }

  public async findAll(params: ISearchUserParams): Promise<User[]> {
    const users = await this.UserModel.find({
      name: { $regex: params.name, $options: 'i' },
      email: { $regex: params.email, $options: 'i' },
      contactPhone: { $regex: params.contactPhone, $options: 'i' },
    })
      .skip(params.offset)
      .limit(params.limit);
    return users;
  }

  public async create(data: Partial<IUser>): Promise<User> {
    const user = new this.UserModel(data);
    return await user.save();
  }
}
