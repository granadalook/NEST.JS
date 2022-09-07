import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';

import { UsersService } from '../../services/users/users.service';
import { CreateUserDto, UpdateUserDto } from '../../dtos/user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('USERS')
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
  @ApiOperation({
    summary: 'TRAE LOS USUARIOS  Y LAS ORDENES QUE TENGAN ASOCIADA',
  })
  getOrders(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getOrderByUser(id);
  }

  @Post()
  @ApiOperation({ summary: 'CREA UN NUEVO USUARIO' })
  create(@Body() payload: CreateUserDto) {
    return this.usersService.create(payload);
  }

  @Put(':id')
  @ApiOperation({ summary: 'EDITA UN USUARIO' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserDto,
  ) {
    return this.usersService.update(id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'ELIMINA UN USUARIO POR ID' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(+id);
  }
}
