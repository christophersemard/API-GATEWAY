import { Controller, Get, Post, Put, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from 'src/schemas/user/user.schema';
import { Body } from '@nestjs/common';
import { UpdateWriteOpResult } from 'mongoose';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'get_hello' })
  public async hello(): Promise<string> {
    return 'Hello World!';
  }
}
