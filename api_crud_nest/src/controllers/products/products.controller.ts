import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductService } from '../../services/product/product.service';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductService) {}
  @Get()
  get() {
    /*  return {
      message: `products limit=> ${limit} offset=> ${offset} brand=> ${brand}`,
    }; */
    return this.productService.findAll();
  }

  @Get('filter')
  @HttpCode(HttpStatus.ACCEPTED)
  getFilter() {
    return { message: `yo soy un filter` };
  }

  @Get(':productId')
  getProduct(@Param('productId') productId: string) {
    /* return { message: `product ${productId}` }; */
    return this.productService.findOne(parseInt(productId));
  }
  @Post()
  create(@Body() body: any) {
    /*   return {
      message: 'retorno mensaje',
      body,
    }; */
    return this.productService.create(body);
  }
  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  update(@Param('id') id: string, @Body() body: any) {
    /*   return {
      message: 'actualizar con put',
      id,
      body,
    }; */

    return this.productService.update(parseInt(id), body);
  }
  @Delete(':id')
  delete(@Param('id') id: string) {
    /*  return {
      message: 'dato eliminado',
      id,
    }; */
    return this.productService.delete(parseInt(id));
  }
}
