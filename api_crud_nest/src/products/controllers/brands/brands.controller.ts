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
import { CreateBrandDto, UpdateBrandDto } from '../../dto/brands.dtos';
import { BrandsService } from '../../services/brands/brands.service';

@ApiTags('BRANDS')
@Controller('brands')
export class BrandsController {
  constructor(private brandsService: BrandsService) {}

  @Get()
  @ApiOperation({ summary: 'TRAE  TODAD LAS MARCAS' })
  findAll() {
    return this.brandsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'TRAE MARCAS POR ID' })
  get(@Param('id', ParseIntPipe) id: number) {
    return this.brandsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'CREAR UNA MARCA' })
  create(@Body() payload: CreateBrandDto) {
    return this.brandsService.create(payload);
  }

  @Put(':id')
  @ApiOperation({ summary: 'EDITAR  UNA MARCA' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateBrandDto,
  ) {
    return this.brandsService.update(id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'ELIMINA  UNA MARCA' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.brandsService.remove(+id);
  }
}
