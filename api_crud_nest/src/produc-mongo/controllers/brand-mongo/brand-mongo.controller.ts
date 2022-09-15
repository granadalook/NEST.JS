import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '../../../security/decorators/roles.decorator';
import { Role } from '../../../security/models/roles.model';
import { Public } from '../../../security/decorators/public.decorator';
import { JwtGuard } from '../../../security/guards/jwt.guard';
import { RolesGuard } from '../../../security/guards/roles.guard';
import { BrandsMongoService } from '../../services/brands-mongo/brands-mongo.service';
import {
  CreateBrandMongoDto,
  UpdateBrandMongoDto,
} from '../../dto/brandMongo.dto';

@ApiTags('BRAND-MONGO')
@UseGuards(JwtGuard, RolesGuard)
@Controller('brand-mongo')
export class BrandMongoController {
  constructor(private brandsService: BrandsMongoService) {}

  @Get()
  @Public()
  @ApiOperation({ summary: 'TRAE  TODAS LAS MARCAS' })
  findAll() {
    return this.brandsService.findAll();
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'TRAE  TODAS LAS MARCAS POR ID' })
  get(@Param('id') id: string) {
    return this.brandsService.findOne(id);
  }

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'CREAR MARCAS' })
  create(@Body() payload: CreateBrandMongoDto) {
    return this.brandsService.create(payload);
  }

  @Put(':id')
  @Roles(Role.SECRETARIO, Role.ADMIN)
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: 'EDITA LAS MARCAS POR ID' })
  update(@Param('id') id: string, @Body() payload: UpdateBrandMongoDto) {
    return this.brandsService.update(id, payload);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'ELIMINAR MARCAS' })
  remove(@Param('id') id: string) {
    return this.brandsService.remove(id);
  }
}
