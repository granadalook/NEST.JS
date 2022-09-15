import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../../../security/guards/jwt.guard';
import { RolesGuard } from '../../../security/guards/roles.guard';
import { Public } from '../../../security/decorators/public.decorator';
import { Roles } from '../../../security/decorators/roles.decorator';
import { Role } from '../../../security/models/roles.model';
import { CustomerMongoService } from '../../services/customer-mongo/customer-mongo.service';
import {
  CreateCustomerMongoDto,
  UpdateCustomerMongoDto,
} from '../../dtos/customerMongo.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('CUSTOMERS-MONGO')
@UseGuards(JwtGuard, RolesGuard)
@Controller('customers-mongo')
export class CustumersMongoController {
  constructor(private customersService: CustomerMongoService) {}

  @Get()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'TRAE TODOS LOS CLIENTES' })
  findAll() {
    return this.customersService.findAll();
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.CUSTOMER)
  @ApiOperation({ summary: 'TRAE TODOS LOS CLIENTES POR ID' })
  get(@Param('id') id: string) {
    return this.customersService.findOne(id);
  }

  @Post()
  @Public()
  @ApiOperation({ summary: 'CREAR  CLIENTES' })
  create(@Body() payload: CreateCustomerMongoDto) {
    return this.customersService.create(payload);
  }

  @Put(':id')
  @Roles(Role.ADMIN, Role.CUSTOMER)
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: 'EDITAR CLIENTES' })
  update(@Param('id') id: string, @Body() payload: UpdateCustomerMongoDto) {
    return this.customersService.update(id, payload);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.CUSTOMER, Role.USER)
  @ApiOperation({ summary: 'ELIMINAR CLIENTES' })
  remove(@Param('id') id: string) {
    return this.customersService.remove(id);
  }
}
