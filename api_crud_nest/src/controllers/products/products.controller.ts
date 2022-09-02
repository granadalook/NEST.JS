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
} from '@nestjs/common';
import { ProductService } from '../../services/product/product.service';
import { ParseIntExamplePipe } from '../../common/parse-int-example.pipe';
import { CreateProductDTO, UpdateProductDTO } from './../../DTO/products.dto';

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
  getProduct(@Param('productId', ParseIntExamplePipe) productId: number) {
    /* return { message: `product ${productId}` }; */
    return this.productService.findOne(productId);
  }
  @Post()
  create(@Body() body: CreateProductDTO) {
    /*   return {
      message: 'retorno mensaje',
      body,
    }; */
    return this.productService.create(body);
  }
  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  update(
    @Param('id', ParseIntExamplePipe) id: number,
    @Body() body: UpdateProductDTO,
  ) {
    /*   return {
      message: 'actualizar con put',
      id,
      body,
    }; */

    return this.productService.update(id, body);
  }
  @Delete(':id')
  delete(@Param('id', ParseIntExamplePipe) id: number) {
    /*  return {
      message: 'dato eliminado',
      id,
    }; */
    return this.productService.delete(id);
  }
}
