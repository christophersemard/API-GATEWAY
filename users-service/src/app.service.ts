import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user/user.schema';
import { Model, UpdateWriteOpResult } from 'mongoose';

@Injectable()
export class AppService {}
