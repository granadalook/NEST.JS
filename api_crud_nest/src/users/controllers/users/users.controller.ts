import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';

import { UsersService } from '../../services/users/users.service';
import { CreateUserDto, UpdateUserDto } from '../../dtos/user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../../../security/guards/jwt.guard';
import { RolesGuard } from '../../../security/guards/roles.guard';
import { Public } from '../../../security/decorators/public.decorator';
import { Roles } from '../../../security/decorators/roles.decorator';
import { Role } from '../../../security/models/roles.model';
@ApiTags('USERS')
@UseGuards(JwtGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'TRAE TODOS LOS USUARIOS' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'TRAE LOS USUARIOS POR ID' })
  get(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Get(':id/orders')
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary: 'TRAE LOS USUARIOS  Y LAS ORDENES QUE TENGAN ASOCIADA',
  })
  getOrders(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getOrderByUser(id);
  }

  @Post()
  @Public()
  @ApiOperation({ summary: 'CREA UN NUEVO USUARIO' })
  create(@Body() payload: CreateUserDto) {
    return this.usersService.create(payload);
  }

  @Put(':id')
  @Roles(Role.USER, Role.ADMIN)
  @ApiOperation({ summary: 'EDITA UN USUARIO' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserDto,
  ) {
    return this.usersService.update(id, payload);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'ELIMINA UN USUARIO POR ID' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
