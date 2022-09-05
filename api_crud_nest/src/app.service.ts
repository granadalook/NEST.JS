import { Inject, Injectable } from '@nestjs/common';
import { Client } from 'pg';

@Injectable()
export class AppService {
  constructor(@Inject('PG') private clientPg: Client) {} // injectamos el PG desde el modulo global
  getHello(): string {
    return 'Hello World!';
  }
}
