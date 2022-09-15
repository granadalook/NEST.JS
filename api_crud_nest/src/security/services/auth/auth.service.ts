/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PayloadToken } from 'src/security/models/token.model';
import { UserMongoService } from '../../../user-mongo/services/user-mongo/user-mongo.service';
import { User } from '../../../users/entities/user.entity';
import { UsersService } from '../../../users/services/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userMongoService: UserMongoService,
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const userMongo = await this.userMongoService.findByEmail(email);
    const user = await this.userService.findByEmail(email);
    if (userMongo) {
      const isMatch = await bcrypt.compare(password, userMongo.password);
      if (!isMatch) {
        throw new UnauthorizedException('PASSWORD NO CONINCIDE');
      }
      return userMongo.toJSON();
    }

    if (!user) {
      throw new UnauthorizedException('EMAIL NO ENCONTRADO');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('PASSWORD NO CONINCIDE');
    }
    return user;
  }

  generateJwt(user: User) {
    const payload: PayloadToken = { role: user.role, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
