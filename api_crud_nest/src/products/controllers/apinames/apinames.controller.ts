import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateMarvelDto } from '../../../products/dto/marvel.dto';
import { CreateApiNamesDto } from '../../../products/dto/apinames.dto';
import { ApiNamesService } from '../../services/api-names/api-names.service';

@ApiTags('APINAMES')
@Controller('apinames')
export class ApinamesController {
  constructor(private apiNameService: ApiNamesService) {}

  @Get('rick')
  @ApiOperation({ summary: 'TRAE LA LISTA DE LOS PRODUCTOS' }) // PARA  HACER DESCRIOCION DEL ENDPONIT
  get() {
    return;
  }

  @Post('apis')
  @ApiOperation({ summary: 'CREAR UN PRODUCTO NUEVO' })
  create(@Body() body: CreateApiNamesDto, @Query() params: CreateMarvelDto) {
    return this.apiNameService.createApi(body, params);
  }

  @Get('marvel')
  createMarvel(@Query() params: CreateMarvelDto) {
    return this.apiNameService.createMarvel(params);
  }
}
