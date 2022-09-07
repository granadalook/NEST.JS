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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateCategoryDto, UpdateCategoryDto } from '../../dto/category.dtos';
import { CategoriesService } from '../../services/categories/categories.service';
@ApiTags('CATEGORIAS') // DOCUMENTACION SWAGGER
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  @ApiOperation({ summary: 'TREA TODAS LAS CATEGORIAS' })
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'TRAE LAS CATEGORIAS POR ID' })
  get(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'CREA UNA CATEGORIA' })
  create(@Body() payload: CreateCategoryDto) {
    return this.categoriesService.create(payload);
  }

  @Put(':id')
  @ApiOperation({ summary: 'EDITA UNA CATEGORIA ' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'ELIMINAR UNA CATEGORIA' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.remove(+id);
  }
}
