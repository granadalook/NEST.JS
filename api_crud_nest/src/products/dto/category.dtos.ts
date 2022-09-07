/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'NOMBRE DE LA CATEGORIA' })
  readonly name: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
