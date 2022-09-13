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
//import { ApikeyGuard } from '../../../security/guards/apikey.guard';
import { Public } from '../../../security/decorators/public.decorator';
import { JwtGuard } from '../../../security/guards/jwt.guard';
import { Roles } from '../../../security/decorators/roles.decorator';
import { Role } from '../../../security/models/roles.model';
import { RolesGuard } from '../../../security/guards/roles.guard';

@ApiTags('PRODUCTS')
@UseGuards(JwtGuard, RolesGuard) //  DES  ESTA MANERA BLOQUEAMOS   TODO EL  CONTROLADOR   CON  JWT
//@UseGuards(ApikeyGuard) // DE ESTA MANERA   UTILIZAMOS LOS GUARDIANES  PARA  TODO EL CONTROLLADOR   Y TODOS LOS ENDPONIS
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductService) {}

  @Get()
  @Public()
  @ApiOperation({ summary: 'LISTA DE PRODUCTOS CON QUERY PARAMS' }) // PARA  HACER DESCRIOCION DEL ENDPONIT
  getProducts(@Query() params: FilterProductsDto) {
    return this.productService.findAll(params);
  }

  @Get()
  @Public() //  CON  ESTA ESTRATEGIA  HACEMOS  QUE ESTE METODO SEA PUBLICO
  @ApiOperation({ summary: 'TRAE LA LISTA DE LOS PRODUCTOS' }) // PARA  HACER DESCRIOCION DEL ENDPONIT
  get() {
    return this.productService.findAll();
  }

  //@SetMetadata('isPublic', true) //  DE ESTA MANERA  HACEMOS  LA EXEPCION DE ESTE ENDPONIT
  @Get(':productId')
  @Public()
  @ApiOperation({ summary: 'TRAE PRODUCTOS POR ID' })
  getProduct(@Param('productId', ParseIntExamplePipe) productId: number) {
    return this.productService.findOnePro(productId);
  }

  @Post()
  @Roles(Role.ADMIN) //  DE ESTA MANERA SOLO LE DAMOS ACCESO   AL METODO  SI ES DE ROL ADMINISTRADOR
  @ApiOperation({ summary: 'CREAR UN PRODUCTO NUEVO' })
  create(@Body() body: CreateProductsDTO) {
    return this.productService.create(body);
  }
  @Put(':id')
  @Roles(Role.SECRETARIO)
  @ApiOperation({ summary: 'EDITAR  UN PRODUCTO POR ID' })
  @HttpCode(HttpStatus.ACCEPTED) //  se pone el codigo de estado que  queramos
  update(
    @Param('id', ParseIntExamplePipe) id: number,
    @Body() body: UpdateAuthorDto,
  ) {
    return this.productService.update(id, body);
  }
  @Put(':id/category/:categoryId')
  @Roles(Role.SECRETARIO)
  @ApiOperation({ summary: 'AGREGAR  UNA CATEGORIA A UN PRODUCTO' })
  @HttpCode(HttpStatus.ACCEPTED) //  se pone el codigo de estado que  queramos
  updateCategories(
    @Param('id', ParseIntExamplePipe) id: number,
    @Param('categoryId', ParseIntExamplePipe) categoryId: number, // pasa el Param a un number   estrictamente
  ) {
    return this.productService.addCatedoryToProduct(id, categoryId);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'ELIMINAR UN PRODUCTO' })
  delete(@Param('id', ParseIntExamplePipe) id: number) {
    return this.productService.delete(id);
  }
  @Delete(':id/category/:categoryId')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'ELIMINAR UNA CATEGORIA DE UN PRODUCTO' })
  deleteCategory(
    @Param('id', ParseIntExamplePipe) id: number, // pasa el Param a un number   estrictamente
    @Param('categoryId', ParseIntExamplePipe) categoryId: number, // pasa el Param a un number   estrictamente
  ) {
    return this.productService.deleteCategoriesByProduct(id, categoryId);
  }
}
