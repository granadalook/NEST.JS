import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../../../security/guards/jwt.guard';
import { RolesGuard } from '../../../security/guards/roles.guard';
import { Public } from '../../../security/decorators/public.decorator';
import { Roles } from '../../../security/decorators/roles.decorator';
import { Role } from '../../../security/models/roles.model';
import { UserMongoService } from '../../services/user-mongo/user-mongo.service';
import {
  CreateUserMongoDto,
  UpdateUserMongoDto,
} from '../../dtos/userMongo.dto';

@ApiTags('USERS-MONGO')
@UseGuards(JwtGuard, RolesGuard)
@Controller('usersmongo')
export class UsersMongoController {
  constructor(private usersService: UserMongoService) {}

  @Get()
  @ApiOperation({ summary: 'TRAE TODOS LOS USUARIOS' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get('tasks')
  @Roles(Role.ADMIN)
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
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'TRAE TODOS LAS ORDENES DE LOS USUARIOS' })
  getOrders(@Param('id') id: string) {
    return this.usersService.getOrdersByUser(id);
  }

  @Post()
  @Public()
  @ApiOperation({ summary: 'CREAR USUARIOS' })
  create(@Body() payload: CreateUserMongoDto) {
    return this.usersService.create(payload);
  }

  @Put(':id')
  @Roles(Role.USER, Role.ADMIN)
  @ApiOperation({ summary: 'EDITAR USUARIOS' })
  update(@Param('id') id: string, @Body() payload: UpdateUserMongoDto) {
    return this.usersService.update(id, payload);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'ELIMINAR USUARIOS' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
