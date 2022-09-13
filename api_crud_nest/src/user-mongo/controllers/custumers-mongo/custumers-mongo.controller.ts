import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';

import { CustomerMongoService } from '../../services/customer-mongo/customer-mongo.service';
import {
  CreateCustomerDto,
  UpdateCustomerDto,
} from '../../dtos/customerMongo.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('CUSTOMERS-MONGO')
@Controller('customers-mongo')
export class CustumersMongoController {
  constructor(private customersService: CustomerMongoService) {}

  @Get()
  findAll() {
    return this.customersService.findAll();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.customersService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateCustomerDto) {
    return this.customersService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateCustomerDto) {
    return this.customersService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customersService.remove(id);
  }
}
