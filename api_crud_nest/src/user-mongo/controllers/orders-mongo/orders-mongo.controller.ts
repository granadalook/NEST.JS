/* eslint-disable prettier/prettier */
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

import { OrderMongoService } from '../../services/order-mongo/order-mongo.service';
import {
  AddProductsToOrderMongoDto,
  CreateOrderMongoDto,
  UpdateOrderMongoDto,
} from '../../dtos/orderMongo.dto';

@ApiTags('ORDERS MONGO')
@Controller('ordersmongo')
export class OrdersMongoController {
  constructor(private ordersService: OrderMongoService) {}

  @Get()
  @ApiOperation({ summary: 'TRAER TODOS LAS ORDENES' })
  findAllone() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'TRAER TODOS LAS ORDENES POR ID' })
  get(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'CREAR ORDENES' })
  create(@Body() payload: CreateOrderMongoDto) {
    return this.ordersService.create(payload);
  }

  @Put(':id')
  @ApiOperation({ summary: 'EDITAR  ORDENES' })
  update(@Param('id') id: string, @Body() payload: UpdateOrderMongoDto) {
    return this.ordersService.update(id, payload);
  }

  @Put(':id/products')
  @ApiOperation({ summary: 'EDITAR LOS PRODUCTOS DE LA ORDEN' })
  updateProducts(
    @Param('id') id: string,
    @Body() payload: AddProductsToOrderMongoDto,
  ) {
    return this.ordersService.addProducts(id, payload.productsIds);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'ELIMINA ORDEN' })
  remove(@Param('id') id: string) {
    return this.ordersService.remove(id);
  }
  @Delete(':id/product/:productId')
  @ApiOperation({ summary: 'ELIMINA UN PRODUCTO DE LA ORDEN ' })
  removeProduct(
    @Param('id') id: string,
    @Param('productId') productId: string,
  ) {
    return this.ordersService.removeProduct(id, productId);
  }
}
