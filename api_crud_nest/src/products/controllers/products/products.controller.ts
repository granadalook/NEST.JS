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
  UseGuards,
} from '@nestjs/common';
import { ProductService } from '../../services/product/product.service';
import { ParseIntExamplePipe } from '../../../common/parseInt/parse-int-example.pipe';
import {
  CreateProductsDTO,
  FilterProductsDto,
  UpdateAuthorDto,
} from '../../dto/products.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger'; // PARA DOCUMENTAR LOS ENDPOINST DE CADA GRUPO
import { ApikeyGuard } from '../../../security/guards/apikey.guard';

@ApiTags('PRODUCTS')
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductService) {}

  @Get()
  @UseGuards(ApikeyGuard)
  @ApiOperation({ summary: 'LISTA DE PRODUCTOS CON QUERY PARAMS' }) // PARA  HACER DESCRIOCION DEL ENDPONIT
  getProducts(@Query() params: FilterProductsDto) {
    return this.productService.findAll(params);
  }

  @UseGuards(ApikeyGuard) // DE ESTA MANERA   UTILIZAMOS LOS GUARDIANES
  @Get()
  @ApiOperation({ summary: 'TRAE LA LISTA DE LOS PRODUCTOS' }) // PARA  HACER DESCRIOCION DEL ENDPONIT
  get() {
    return this.productService.findAll();
  }

  @Get(':productId')
  @ApiOperation({ summary: 'TRAE PRODUCTOS POR ID' })
  getProduct(@Param('productId', ParseIntExamplePipe) productId: number) {
    return this.productService.findOnePro(productId);
  }
  @Post()
  @ApiOperation({ summary: 'CREAR UN PRODUCTO NUEVO' })
  create(@Body() body: CreateProductsDTO) {
    return this.productService.create(body);
  }
  @Put(':id')
  @ApiOperation({ summary: 'EDITAR  UN PRODUCTO POR ID' })
  @HttpCode(HttpStatus.ACCEPTED) //  se pone el codigo de estado que  queramos
  update(
    @Param('id', ParseIntExamplePipe) id: number,
    @Body() body: UpdateAuthorDto,
  ) {
    return this.productService.update(id, body);
  }
  @Put(':id/category/:categoryId')
  @ApiOperation({ summary: 'AGREGAR  UNA CATEGORIA A UN PRODUCTO' })
  @HttpCode(HttpStatus.ACCEPTED) //  se pone el codigo de estado que  queramos
  updateCategories(
    @Param('id', ParseIntExamplePipe) id: number,
    @Param('categoryId', ParseIntExamplePipe) categoryId: number, // pasa el Param a un number   estrictamente
  ) {
    return this.productService.addCatedoryToProduct(id, categoryId);
  }
  @Delete(':id')
  @ApiOperation({ summary: 'ELIMINAR UN PRODUCTO' })
  delete(@Param('id', ParseIntExamplePipe) id: number) {
    return this.productService.delete(id);
  }
  @Delete(':id/category/:categoryId')
  @ApiOperation({ summary: 'ELIMINAR UNA CATEGORIA DE UN PRODUCTO' })
  deleteCategory(
    @Param('id', ParseIntExamplePipe) id: number, // pasa el Param a un number   estrictamente
    @Param('categoryId', ParseIntExamplePipe) categoryId: number, // pasa el Param a un number   estrictamente
  ) {
    return this.productService.deleteCategoriesByProduct(id, categoryId);
  }
}
