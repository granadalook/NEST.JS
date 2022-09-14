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
} from '@nestjs/common';

import { CustomerMongoService } from '../../services/customer-mongo/customer-mongo.service';
import {
  CreateCustomerMongoDto,
  UpdateCustomerMongoDto,
} from '../../dtos/customerMongo.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('CUSTOMERS-MONGO')
@Controller('customers-mongo')
export class CustumersMongoController {
  constructor(private customersService: CustomerMongoService) {}

  @Get()
  @ApiOperation({ summary: 'TRAE TODOS LOS CLIENTES' })
  findAll() {
    return this.customersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'TRAE TODOS LOS CLIENTES POR ID' })
  get(@Param('id') id: string) {
    return this.customersService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'CREAR  CLIENTES' })
  create(@Body() payload: CreateCustomerMongoDto) {
    return this.customersService.create(payload);
  }

  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: 'EDITAR CLIENTES' })
  update(@Param('id') id: string, @Body() payload: UpdateCustomerMongoDto) {
    return this.customersService.update(id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'ELIMINAR CLIENTES' })
  remove(@Param('id') id: string) {
    return this.customersService.remove(id);
  }
}
