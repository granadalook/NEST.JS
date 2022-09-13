/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsUrl } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateCategoryMongoDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `NOMBRE CATEGORIA MONGO` })
  readonly name: string;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({ description: `URL IMAGEN CATEGORIA` })
  readonly image: string;
}

export class UpdateCategoryMongoDto extends PartialType(
  CreateCategoryMongoDto,
) {}
