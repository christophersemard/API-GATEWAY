import { Controller, Get, Post, Put, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/schemas/user/user.schema';
import { Body } from '@nestjs/common';
import { UpdateWriteOpResult } from 'mongoose';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @MessagePattern({ cmd: 'register' })
  // public async create(@Body() user: User): Promise<User> {
  //   console.log('create user', user);
  //   return this.usersService.create(user);
  // }

  // @MessagePattern({ cmd: 'login' })
  // public async login(@Body() user: User): Promise<User> {
  //   return this.usersService.login(user);
  // }

  @MessagePattern({ cmd: 'get_all' })
  public async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @MessagePattern({ cmd: 'get_one' })
  public async findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }
}
