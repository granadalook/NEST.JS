/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Param,
  HttpStatus,
  HttpCode,
  Post,
  Body,
  Put,
  Delete,
  Query,
  UseGuards,

  // ParseIntPipe,
} from '@nestjs/common';

import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { JwtGuard } from '../../../security/guards/jwt.guard';
import { RolesGuard } from '../../../security/guards/roles.guard';
import { MongoPipe } from '../../../common/mongoPipe/mongo.pipe';
import {
  CreateProductMongoDto,
  FilterProductsMongoDto,
  UpdateProductMongoDto,
} from '../../dto/productMongo.dtos';
import { ProductMongoService } from '../../services/product-mongo/product-mongo.service';
import { Public } from '../../../security/decorators/public.decorator';
import { Roles } from '../../../security/decorators/roles.decorator';
import { Role } from '../../../security/models/roles.model';

@ApiTags('PRODUCTS MONGO')
@UseGuards(JwtGuard, RolesGuard)
@Controller('productsmongo')
export class ProducMongoController {
  constructor(private productsService: ProductMongoService) {}

  @Get()
  @Public()
  @ApiOperation({ summary: 'TRAER TODOS LOS PRODUCTOS' })
  getProducts(@Query() params: FilterProductsMongoDto) {
    return this.productsService.findAll(params);
  }

  @Get(':productId')
  @Public()
  @ApiOperation({ summary: 'TRAER TODOS LOS PRODUCTOS POR ID' })
  getOne(@Param('productId', MongoPipe) productId: string) {
    return this.productsService.findOne(productId);
  }

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'CREAR PRODUCTOS' })
  create(@Body() payload: CreateProductMongoDto) {
    return this.productsService.create(payload);
  }

  @Put(':id')
  @Roles(Role.SECRETARIO)
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: 'EDITAR  PRODUCTOS POR ID' })
  update(
    @Param('id', MongoPipe) id: string,
    @Body() payload: UpdateProductMongoDto,
  ) {
    return this.productsService.update(id, payload);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'ELIMIAR PRODUCTOS' })
  delete(@Param('id', MongoPipe) id: string) {
    return this.productsService.remove(id);
  }
}
