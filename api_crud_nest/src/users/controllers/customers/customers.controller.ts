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

import { CustomersService } from '../../services/customers/customers.service';
import { CreateCustomerDto, UpdateCustomerDto } from '../../dtos/customer.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('CUSTOMERS')
@Controller('customers')
export class CustomerController {
  constructor(private customersService: CustomersService) {}

  @Get()
  @ApiOperation({ summary: 'TRAE TODOS LOS CLIENTES' })
  findAll() {
    return this.customersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'TRAE LOS CLIENTES POR ID' })
  get(@Param('id', ParseIntPipe) id: number) {
    return this.customersService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'CREA UN CLIENTE' })
  create(@Body() payload: CreateCustomerDto) {
    return this.customersService.create(payload);
  }

  @Put(':id')
  @ApiOperation({ summary: 'EDITAR UN CLIENTE' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCustomerDto,
  ) {
    return this.customersService.update(id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'ELIMINAR UN CLIENTE' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.customersService.remove(+id);
  }
}
