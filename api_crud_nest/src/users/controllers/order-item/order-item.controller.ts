import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateOrderItemDto } from '../../dtos/order-item.dto';
import { OrderItemService } from '../../services/order-item/order-item.service';
@ApiTags('ORDER-ITEM')
@Controller('order-item')
export class OrderItemController {
  constructor(private itemsService: OrderItemService) {}

  @Get()
  @ApiOperation({ summary: 'TRAE TODOS LOS ITEMS' })
  findAll() {
    return this.itemsService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'TABLA INTERMEDIA DE RELACION' })
  create(@Body() payload: CreateOrderItemDto) {
    return this.itemsService.create(payload);
  }
}
