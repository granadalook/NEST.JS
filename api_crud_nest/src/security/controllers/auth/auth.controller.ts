import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { User } from '../../../users/entities/user.entity';
import { AuthService } from '../../services/auth/auth.service';

@ApiTags('AUTENTICACION JWT')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @ApiOperation({ summary: 'GERERA UN JWT PARA USUARIO AUTENTICADO ' })
  @HttpCode(HttpStatus.ACCEPTED)
  @Post('login')
  login(@Req() req: Request) {
    const user = req.user as User;
    return this.authService.generateJwt(user); //  asi se genera un jwt a un usuario loggeado
  }
}
