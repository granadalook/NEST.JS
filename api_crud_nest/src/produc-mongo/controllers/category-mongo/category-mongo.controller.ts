import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';

import { CategorysMongoService } from '../../services/categorys-mongo/categorys-mongo.service';
import {
  CreateCategoryMongoDto,
  UpdateCategoryMongoDto,
} from '../../dto/categoryMongo.dtos';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('CATEGORIES-MONGO')
@Controller('categories-mongo')
export class CategoryMongoController {
  constructor(private categoriesService: CategorysMongoService) {}

  @Get()
  @ApiOperation({ summary: 'TRAE TODAS LAS CATEGORIAS' })
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'TRAE LAS CATEGORIAS POR ID' })
  get(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'CREA CATEGORIAS' })
  create(@Body() payload: CreateCategoryMongoDto) {
    return this.categoriesService.create(payload);
  }

  @Put(':id')
  @ApiOperation({ summary: 'EDITA  CATEGORIAS POR ID' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCategoryMongoDto,
  ) {
    return this.categoriesService.update(id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'ELIMINA CATEGORIA POR ID' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.remove(+id);
  }
}
