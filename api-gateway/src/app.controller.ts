import { Body, Controller, Get, Inject, Post, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { Param } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Controller('auth')
export class AppController {
  constructor(
    @Inject('USERS_SERVICE') private readonly usersService: ClientProxy,
  ) {}

  @Get('hello')
  async getHello() {
    return this.usersService.send({ cmd: 'get_hello' }, {});
  }

  @Post('register')
  async register(@Body() user: { username: string; password: string }) {
    return this.usersService.send({ cmd: 'register' }, user);
  }

  @Post('login')
  async login(@Body() user: { username: string; password: string }) {
    return this.usersService.send({ cmd: 'login' }, user);
  }

  @Get('profile')
  async getProfile(@Request() req) {
    const token = req.headers.authorization?.split(' ')[1]; // Extraire le token de l'en-tête Authorization
    // console.log('Token reçu par api-gateway', token);

    if (!token) {
      return { error: 'No token' };
    }

    return this.usersService
      .send({ cmd: 'get_profile' }, { token }) // Envoi du token dans le message RPC
      .pipe(
        catchError((error) => {
          // Si le microservice renvoie une erreur, la capturer et transformer en réponse HTTP
          if (error.statusCode === 401) {
            throw new HttpException(
              { message: error.message, error: error.error },
              HttpStatus.UNAUTHORIZED,
            );
          }
          return throwError(() => error);
        }),
      );
  }

  @Get('users')
  async getUsers() {
    return this.usersService.send({ cmd: 'get_all' }, {});
  }

  @Get('users/:id')
  async getUser(@Param('id') id: string) {
    return this.usersService.send({ cmd: 'get_one' }, id);
  }
}
