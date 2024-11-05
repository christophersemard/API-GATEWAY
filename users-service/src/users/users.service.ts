import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user/user.schema';
import { Model, UpdateWriteOpResult } from 'mongoose';

@Injectable()
export class UsersService {
  public constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  public async create(user: User): Promise<User> {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  public async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  public async findOne(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  public async login(user: User): Promise<User> {
    return this.userModel
      .findOne({ username: user.username, password: user.password })
      .exec();
  }
}
