import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User, UserSchema } from '../schemas/user/user.schema';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from '@nestjs/config'; // Import du ConfigModule

@Module({
  imports: [
    ConfigModule, // Ajout du ConfigModule ici
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret', // Utilisation de la variable d'environnement JWT_SECRET
      signOptions: { expiresIn: '24h' },
    }),
    PassportModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
