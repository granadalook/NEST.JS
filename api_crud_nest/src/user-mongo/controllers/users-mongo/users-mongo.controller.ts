import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { UserMongoService } from '../../services/user-mongo/user-mongo.service';
import {
  CreateUserMongoDto,
  UpdateUserMongoDto,
} from '../../dtos/userMongo.dto';

@ApiTags('USERS-MONGO')
@Controller('usersmongo')
export class UsersMongoController {
  constructor(private usersService: UserMongoService) {}

  @Get()
  @ApiOperation({ summary: 'TRAE TODOS LOS USUARIOS' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get('tasks')
  @ApiOperation({ summary: 'TRAE TODOS LAS MARCAS DE LOS CLIENTES ' })
  tasks() {
    return this.usersService.getTasks();
  }

  @Get(':id')
  @ApiOperation({ summary: 'TRAE TODOS LOS USUARIOS POR ID' })
  get(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Get(':id/orders')
  @ApiOperation({ summary: 'TRAE TODOS LAS ORDENES DE LOS USUARIOS' })
  getOrders(@Param('id') id: string) {
    return this.usersService.getOrdersByUser(id);
  }

  @Post()
  @ApiOperation({ summary: 'CREAR USUARIOS' })
  create(@Body() payload: CreateUserMongoDto) {
    return this.usersService.create(payload);
  }

  @Put(':id')
  @ApiOperation({ summary: 'EDITAR USUARIOS' })
  update(@Param('id') id: string, @Body() payload: UpdateUserMongoDto) {
    return this.usersService.update(id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'ELIMINAR USUARIOS' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
