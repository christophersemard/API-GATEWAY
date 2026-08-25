// src/auth/auth.service.ts
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from '../schemas/user/user.schema';
import { CreateUserDto, LoginUserDto } from '../dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  async comparePasswords(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  async register(createUserDto: CreateUserDto): Promise<any> {
    const { username, password } = createUserDto;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await this.userModel.findOne({ username });
    if (existingUser) {
      throw new UnauthorizedException('Username already taken');
    }

    const hashedPassword = await this.hashPassword(password);
    const newUser = new this.userModel({ username, password: hashedPassword });
    await newUser.save();
    return { message: 'User registered successfully' };
  }

  async login(loginUserData: LoginUserDto) {
    const { username, password } = loginUserData;

    const user = await this.userModel
      .findOne({
        username,
      })
      .select('+password');

    if (!user) {
      throw new NotFoundException('Utilisateur introuvable !');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Identifiants invalides !');
    }

    const payload = { username, sub: user._id };
    const accessToken = this.jwtService.sign(payload);

    return {
      access_token: accessToken,
    };
  }

  // async getProfile(token: string) {
  //   // return { username: 'test' };
  //   console.log('Token reçu par users-service', token);
  //   const decoded = this.jwtService.decode(token);
  //   console.log('decoded', decoded);
  //   let user = await this.userModel.findOne({ _id: decoded.sub });
  //   return { username: user.username };
  // }
}
