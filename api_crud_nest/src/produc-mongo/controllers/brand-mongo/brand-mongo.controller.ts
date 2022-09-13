import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { BrandsMongoService } from '../../services/brands-mongo/brands-mongo.service';
import {
  CreateBrandMongoDto,
  UpdateBrandMongoDto,
} from '../../dto/brandMongo.dto';

@ApiTags('BRAND-MONGO')
@Controller('brand-mongo')
export class BrandMongoController {
  constructor(private brandsService: BrandsMongoService) {}

  @Get()
  @ApiOperation({ summary: 'TRAE  TODAS LAS MARCAS' })
  findAll() {
    return this.brandsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'TRAE  TODAS LAS MARCAS POR ID' })
  get(@Param('id') id: string) {
    return this.brandsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'CREAR MARCAS' })
  create(@Body() payload: CreateBrandMongoDto) {
    return this.brandsService.create(payload);
  }

  @Put(':id')
  @ApiOperation({ summary: 'EDITA LAS MARCAS POR ID' })
  update(@Param('id') id: string, @Body() payload: UpdateBrandMongoDto) {
    return this.brandsService.update(id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'ELIMINAR MARCAS' })
  remove(@Param('id') id: string) {
    return this.brandsService.remove(id);
  }
}
