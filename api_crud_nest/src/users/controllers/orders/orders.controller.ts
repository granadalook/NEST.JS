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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateOrderDto, UpdateOrderDto } from '../../dtos/order.dto';
import { OrdersService } from '../../services/orders/orders.service';
@ApiTags('ORDERS')
@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @Get()
  @ApiOperation({ summary: 'TRAE TODAS LAS ORDENES' })
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'TRAE LAS ORDENES POR ID' })
  get(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'CREA UNA NUEVA ORDEN' })
  create(@Body() payload: CreateOrderDto) {
    return this.orderService.create(payload);
  }

  @Put(':id')
  @ApiOperation({ summary: 'EDIATA UNA ORDEN ' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateOrderDto,
  ) {
    return this.orderService.update(id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'ELIMINA UNA ORDEN POR ID' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.remove(+id);
  }
}
