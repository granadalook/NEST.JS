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

@ApiTags('AUTENTICATION')
@Controller('auth')
export class AuthController {
  @UseGuards(AuthGuard('local'))
  @ApiOperation({ summary: 'LISTA DE PRODUCTOS CON QUERY PARAMS' })
  @HttpCode(HttpStatus.ACCEPTED)
  @Post('login')
  login(@Req() req: Request) {
    return req.user;
  }
}
