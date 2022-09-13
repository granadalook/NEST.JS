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

import { CustomersService } from '../../services/customers/customers.service';
import { CreateCustomerDto, UpdateCustomerDto } from '../../dtos/customer.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../../../security/guards/jwt.guard';
import { RolesGuard } from '../../../security/guards/roles.guard';
import { Public } from '../../../security/decorators/public.decorator';
import { Roles } from '../../../security/decorators/roles.decorator';
import { Role } from '../../../security/models/roles.model';
@ApiTags('CUSTOMERS')
@UseGuards(JwtGuard, RolesGuard)
@Controller('customers')
export class CustomerController {
  constructor(private customersService: CustomersService) {}

  @Get()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'TRAE TODOS LOS CLIENTES' })
  findAll() {
    return this.customersService.findAll();
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.CUSTOMER)
  @ApiOperation({ summary: 'TRAE LOS CLIENTES POR ID' })
  get(@Param('id', ParseIntPipe) id: number) {
    return this.customersService.findOne(id);
  }

  @Post()
  @Public()
  @ApiOperation({ summary: 'CREA UN CLIENTE' })
  create(@Body() payload: CreateCustomerDto) {
    return this.customersService.create(payload);
  }

  @Put(':id')
  @Roles(Role.ADMIN, Role.CUSTOMER)
  @ApiOperation({ summary: 'EDITAR UN CLIENTE' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCustomerDto,
  ) {
    return this.customersService.update(id, payload);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.CUSTOMER, Role.USER)
  @ApiOperation({ summary: 'ELIMINAR UN CLIENTE' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.customersService.remove(id);
  }
}
