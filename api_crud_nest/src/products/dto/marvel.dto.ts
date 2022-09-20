/* eslint-disable prettier/prettier */

import { IsOptional } from 'class-validator';

export class CreateMarvelDto {
  @IsOptional()
  ts: number;
  @IsOptional()
  apikey: string;
  @IsOptional()
  hash: string;
}
