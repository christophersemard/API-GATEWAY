// src/auth/auth.controller.ts
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from '../dto/user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { MessagePattern } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'register' })
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @MessagePattern({ cmd: 'login' })
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern({ cmd: 'get_profile' })
  getProfile(@Body() body) {
    // Utiliser le token validé par JwtAuthGuard pour obtenir le profil utilisateur
    return { username: body.user.username };
    // return this.authService.getProfile(body.user); // body.user contient les informations décodées par JwtAuthGuard
  }
}
