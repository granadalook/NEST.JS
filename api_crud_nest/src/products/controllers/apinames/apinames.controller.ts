import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
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
  create(@Body() body: CreateApiNamesDto) {
    return this.apiNameService.createApi(body);
  }
}
