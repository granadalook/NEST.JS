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
  CreateProductDto,
  FilterProductsDto,
  UpdateProductDto,
} from '../../dto/productMongo.dtos';
import { ProductMongoService } from '../../services/product-mongo/product-mongo.service';

@ApiTags('PRODUCTS MONGO')
@Controller('productsMongo')
export class ProducMongoController {
  constructor(private productsService: ProductMongoService) {}

  @Get()
  getProducts(@Query() params: FilterProductsDto) {
    return this.productsService.findAll(params);
  }

  @Get('filter')
  getProductFilter() {
    return `yo soy un filter`;
  }

  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('productId', MongoPipe) productId: string) {
    return this.productsService.findOne(productId);
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', MongoPipe) id: string,
    @Body() payload: UpdateProductDto,
  ) {
    return this.productsService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', MongoPipe) id: string) {
    return this.productsService.remove(id);
  }
}
