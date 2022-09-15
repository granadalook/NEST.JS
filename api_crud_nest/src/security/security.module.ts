import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt/dist/jwt.module';
import { PassportModule } from '@nestjs/passport';
import { UserMongoModule } from '../user-mongo/user-mongo.module';

import { UsersModule } from '../users/users.module';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  imports: [
    UserMongoModule,
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'token',
      signOptions: { expiresIn: '1d' },
    }),
  ],
})
export class SecurityModule {}
