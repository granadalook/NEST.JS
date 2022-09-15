/* eslint-disable prettier/prettier */
import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  IsOptional,
  Min,
  ValidateIf,
  ValidateNested,
  IsMongoId,
  // IsMongoId,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

import { CreateCategoryMongoDto } from '../dto/categoryMongo.dtos';

export class CreateProductMongoDto {
  id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `NOMBRE DEL PRODUCTO` })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `DESCRIPCION DEL PRODUCTO` })
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: `PRECIO DEL PRODUCTO` })
  readonly price: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: `INVENTARIO DEL PRODUCTO` })
  readonly stock: number;

  @IsUrl()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({ description: `IMAGEN DEL PRODUCTO` })
  readonly image: string;

  @IsNotEmpty()
  @ValidateNested()
  @IsOptional()
  @ApiProperty({ description: `CATEGORIA DEL PRODUCTO` })
  readonly category: CreateCategoryMongoDto;

  @IsNotEmpty()
  @IsMongoId() // validacion de  que sea un mongo ID
  @ApiProperty({ description: `MARCA DEL PRODUCTO` })
  readonly brand: string;
}

export class UpdateProductMongoDto extends PartialType(CreateProductMongoDto) {}

export class FilterProductsMongoDto {
  @IsOptional()
  @IsPositive()
  @ApiProperty({ description: `LIMMIT DEL PRODUCTO` })
  limit: number;

  @IsOptional()
  @Min(0)
  @ApiProperty({ description: `OFFSET DEL PRODUCTO` })
  offset: number;

  @IsOptional()
  @Min(0)
  @ApiProperty({ description: `PRECIO MINIMO DEL PRODUCTO` })
  minPrice: number;

  @ValidateIf((params) => params.minPrice)
  @IsPositive()
  @ApiProperty({ description: `PRECIO MAXIMO PRODUCTO` })
  maxPrice: number;
}
