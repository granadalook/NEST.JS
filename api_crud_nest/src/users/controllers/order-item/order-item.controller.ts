import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../../security/decorators/roles.decorator';
import { Role } from '../../../security/models/roles.model';
import { JwtGuard } from '../../../security/guards/jwt.guard';
import { RolesGuard } from '../../../security/guards/roles.guard';

import { CreateOrderItemDto } from '../../dtos/order-item.dto';
import { OrderItemService } from '../../services/order-item/order-item.service';
@ApiTags('ORDER-ITEM')
@UseGuards(JwtGuard, RolesGuard)
@Controller('order-item')
export class OrderItemController {
  constructor(private itemsService: OrderItemService) {}

  @Get()
  @Roles(Role.ADMIN, Role.SECRETARIO)
  @ApiOperation({ summary: 'TRAE TODOS LOS ITEMS' })
  findAll() {
    return this.itemsService.findAll();
  }

  @Post()
  @Roles(Role.ADMIN, Role.SECRETARIO)
  @ApiOperation({ summary: 'TABLA INTERMEDIA DE RELACION' })
  create(@Body() payload: CreateOrderItemDto) {
    return this.itemsService.create(payload);
  }
}
