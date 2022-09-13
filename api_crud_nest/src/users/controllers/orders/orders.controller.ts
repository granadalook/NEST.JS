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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../../../security/decorators/public.decorator';
import { Roles } from '../../../security/decorators/roles.decorator';
import { Role } from '../../../security/models/roles.model';
import { JwtGuard } from '../../../security/guards/jwt.guard';
import { RolesGuard } from '../../../security/guards/roles.guard';
import { CreateOrderDto, UpdateOrderDto } from '../../dtos/order.dto';
import { OrdersService } from '../../services/orders/orders.service';
@ApiTags('ORDERS')
@UseGuards(JwtGuard, RolesGuard)
@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @Get()
  @Public()
  @ApiOperation({ summary: 'TRAE TODAS LAS ORDENES' })
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.CUSTOMER)
  @ApiOperation({ summary: 'TRAE LAS ORDENES POR ID' })
  get(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.findOne(id);
  }

  @Post()
  @Roles(Role.ADMIN, Role.CUSTOMER)
  @ApiOperation({ summary: 'CREA UNA NUEVA ORDEN' })
  create(@Body() payload: CreateOrderDto) {
    return this.orderService.create(payload);
  }

  @Put(':id')
  @Roles(Role.ADMIN, Role.CUSTOMER)
  @ApiOperation({ summary: 'EDIATA UNA ORDEN ' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateOrderDto,
  ) {
    return this.orderService.update(id, payload);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.CUSTOMER)
  @ApiOperation({ summary: 'ELIMINA UNA ORDEN POR ID' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.remove(id);
  }
}
