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

  // ParseIntPipe,
} from '@nestjs/common';

import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { MongoPipe } from '../../../common/mongoPipe/mongo.pipe';
import {
  CreateProductMongoDto,
  FilterProductsMongoDto,
  UpdateProductMongoDto,
} from '../../dto/productMongo.dtos';
import { ProductMongoService } from '../../services/product-mongo/product-mongo.service';

@ApiTags('PRODUCTS MONGO')
@Controller('productsmongo')
export class ProducMongoController {
  constructor(private productsService: ProductMongoService) {}

  @Get()
  @ApiOperation({ summary: 'TRAER TODOS LOS PRODUCTOS' })
  getProducts(@Query() params: FilterProductsMongoDto) {
    return this.productsService.findAll(params);
  }

  @Get(':productId')
  @ApiOperation({ summary: 'TRAER TODOS LOS PRODUCTOS POR ID' })
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('productId', MongoPipe) productId: string) {
    return this.productsService.findOne(productId);
  }

  @Post()
  @ApiOperation({ summary: 'CREAR PRODUCTOS' })
  create(@Body() payload: CreateProductMongoDto) {
    return this.productsService.create(payload);
  }

  @Put(':id')
  @ApiOperation({ summary: 'EDITAR  PRODUCTOS POR ID' })
  update(
    @Param('id', MongoPipe) id: string,
    @Body() payload: UpdateProductMongoDto,
  ) {
    return this.productsService.update(id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'ELIMIAR PRODUCTOS' })
  delete(@Param('id', MongoPipe) id: string) {
    return this.productsService.remove(id);
  }
}
