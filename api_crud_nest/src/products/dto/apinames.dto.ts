/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateApiNamesDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'NOMBRE DE LA API' })
  readonly name: string;
  @IsOptional()
  ts: number;
  @IsOptional()
  apikey: string;
  @IsOptional()
  hash: string;

  nameRick: string;

  nameSimp: string;

  nameMarvel: string;
}

export class UpdateApiNamesDto extends PartialType(CreateApiNamesDto) {}
