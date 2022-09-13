import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';

import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '../../../security/guards/roles.guard';
import { JwtGuard } from '../../../security/guards/jwt.guard';
import { CreateCategoryDto, UpdateCategoryDto } from '../../dto/category.dtos';
import { CategoriesService } from '../../services/categories/categories.service';
import { Public } from '../../../security/decorators/public.decorator';
import { Roles } from '../../../security/decorators/roles.decorator';
import { Role } from '../../../security/models/roles.model';

@ApiTags('CATEGORIAS') // DOCUMENTACION SWAGGER
@UseGuards(JwtGuard, RolesGuard) //  recibiir jwt
@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  @Public()
  @ApiOperation({ summary: 'TREA TODAS LAS CATEGORIAS' })
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'TRAE LAS CATEGORIAS POR ID' })
  get(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.findOne(id);
  }

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'CREA UNA CATEGORIA' })
  create(@Body() payload: CreateCategoryDto) {
    return this.categoriesService.create(payload);
  }

  @Put(':id')
  @Roles(Role.SECRETARIO, Role.ADMIN)
  @ApiOperation({ summary: 'EDITA UNA CATEGORIA ' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, payload);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'ELIMINAR UNA CATEGORIA' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.remove(id);
  }
}
