import { Controller, Get, Param, Query } from '@nestjs/common';

import { AppService } from './app.service';

@Controller() //decorador
export class AppController {
  constructor(private readonly appService: AppService) {}
}
