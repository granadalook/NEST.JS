/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateApiNamesDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'NOMBRE DE LA API' })
  readonly name: string;

   nameRick: string;

   nameSimp: string;
}

export class UpdateApiNamesDto extends PartialType(CreateApiNamesDto) {}
