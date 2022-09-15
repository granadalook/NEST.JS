import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RolesGuard } from '../../../security/guards/roles.guard';
import { JwtGuard } from '../../../security/guards/jwt.guard';
import { Public } from '../../../security/decorators/public.decorator';
import { Roles } from '../../../security/decorators/roles.decorator';
import { Role } from '../../../security/models/roles.model';
import { CategorysMongoService } from '../../services/categorys-mongo/categorys-mongo.service';
import {
  CreateCategoryMongoDto,
  UpdateCategoryMongoDto,
} from '../../dto/categoryMongo.dtos';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MongoPipe } from '../../../common/mongoPipe/mongo.pipe';
@ApiTags('CATEGORIES-MONGO')
@UseGuards(JwtGuard, RolesGuard)
@Controller('categoriesmongo')
export class CategoryMongoController {
  constructor(private categoriesService: CategorysMongoService) {}

  @Get()
  @Public()
  @ApiOperation({ summary: 'TRAE TODAS LAS CATEGORIAS' })
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'TRAE LAS CATEGORIAS POR ID' })
  get(@Param('id', MongoPipe) id: string) {
    return this.categoriesService.findOne(id);
  }

  @Post()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'CREA CATEGORIAS' })
  create(@Body() payload: CreateCategoryMongoDto) {
    return this.categoriesService.create(payload);
  }

  @Put(':id')
  @Roles(Role.SECRETARIO, Role.ADMIN)
  @ApiOperation({ summary: 'EDITA  CATEGORIAS POR ID' })
  update(
    @Param('id', MongoPipe) id: string,
    @Body() payload: UpdateCategoryMongoDto,
  ) {
    return this.categoriesService.update(id, payload);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'ELIMINA CATEGORIA POR ID' })
  remove(@Param('id', MongoPipe) id: string) {
    return this.categoriesService.remove(id);
  }
}
