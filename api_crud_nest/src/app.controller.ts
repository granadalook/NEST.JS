import { Controller, Get, Param, Query } from '@nestjs/common';

import { AppService } from './app.service';

@Controller() //decorador
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() // decorador http
  getHello(): string {
    return 'como jue';
  }
  //las rutas no dinamicas van primero en la estructura que las dinamicas
  @Get('numero/:paramsId')
  getNumeros(@Param('paramsId') paramsId: number) {
    return `numeros ${paramsId}`;
  }

  @Get('numero/:paramsId/numero/:idNumero')
  getCategorias(
    @Param('paramsId') paramsId: number,
    @Param('idNumero') idNumero: number,
  ) {
    return `numeros ${paramsId} y ${idNumero}`;
  }

  //http://localhost:3000/query?limit=50&offset=30&brand=stiven
  @Get('query')
  getQuerys(
    @Query('limit') limit = 150,
    @Query('offset') offset: number,
    @Query('brand') brand: string,
  ) {
    return `limit ${limit} y tambien offset ${offset} y la marca ${brand} `;
  }
}
