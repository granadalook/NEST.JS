/* eslint-disable prettier/prettier */
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
import { ParseIntExamplePipe } from '../../../common/parse-int-example.pipe';
import {
  CreateProductsDTO,
  FilterProductsDto,
  UpdateAuthorDto,
} from '../../dto/products.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger'; // PARA DOCUMENTAR LOS ENDPOINST DE CADA GRUPO

@ApiTags('PRODUCTS')
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductService) {}

  @Get()
  @ApiOperation({ summary: 'LISTA DE PRODUCTOS CON QUERY PARAMS' }) // PARA  HACER DESCRIOCION DEL ENDPONIT
  getProducts(@Query() params: FilterProductsDto) {
    return this.productService.findAll(params);
  }
  @Get()
  @ApiOperation({ summary: 'TRAE LA LISTA DE LOS PRODUCTOS' }) // PARA  HACER DESCRIOCION DEL ENDPONIT
  get() {
    return this.productService.findAll();
  }

  @Get(':productId')
  getProduct(@Param('productId', ParseIntExamplePipe) productId: number) {
    return this.productService.findOnePro(productId);
  }
  @Post()
  create(@Body() body: CreateProductsDTO) {
    return this.productService.create(body);
  }
  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED) //  se pone el codigo de estado que  queramos
  update(
    @Param('id', ParseIntExamplePipe) id: number,
    @Body() body: UpdateAuthorDto,
  ) {
    return this.productService.update(id, body);
  }
  @Put(':id/category/:categoryId')
  @HttpCode(HttpStatus.ACCEPTED) //  se pone el codigo de estado que  queramos
  updateCategories(
    @Param('id', ParseIntExamplePipe) id: number,
    @Param('categoryId', ParseIntExamplePipe) categoryId: number, // pasa el Param a un number   estrictamente
  ) {
    return this.productService.addCatedoryToProduct(id, categoryId);
  }
  @Delete(':id')
  delete(@Param('id', ParseIntExamplePipe) id: number) {
    return this.productService.delete(id);
  }
  @Delete(':id/category/:categoryId')
  deleteCategory(
    @Param('id', ParseIntExamplePipe) id: number, // pasa el Param a un number   estrictamente
    @Param('categoryId', ParseIntExamplePipe) categoryId: number, // pasa el Param a un number   estrictamente
  ) {
    return this.productService.deleteCategoriesByProduct(id, categoryId);
  }
}
