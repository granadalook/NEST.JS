/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { Client } from 'pg';
import { Db } from 'mongodb';

@Injectable()
export class AppService {
  constructor(
    @Inject('PG') private clientPg: Client,
    @Inject('MONGO') private database: Db,
  ) {} // injectamos el PG desde el modulo global
  getHello(): string {
    return 'Hello World!';
  }
}
