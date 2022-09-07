/* eslint-disable prettier/prettier */
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsUrl,
  IsPositive,
  IsArray,
  IsOptional,
  Min,
  ValidateIf,
} from 'class-validator';
import { ApiProperty, PartialType, OmitType } from '@nestjs/swagger'; // PONER ESTA IMPORTACION PARA  LOS DTO

export class CreateProductsDTO {
  @ApiProperty({ description: 'NOMBRE DEL USUARIO' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'DESCRIPCION DEL USUARIO' })
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @ApiProperty({ description: 'PRECIO DEL USUARIO' }) // DESCRIPCION PARA SWAGER
  @IsNotEmpty()
  @IsNumber()
  readonly price: number;
  @ApiProperty({ description: 'STOCK DEL USUARIO' })
  @IsNumber()
  @IsNotEmpty()
  readonly stock: number;
  @ApiProperty({ description: 'IMAGEN DEL USUARIO' })
  @IsUrl()
  @IsNotEmpty()
  readonly image: string;
  @ApiProperty({ description: 'RELACION DEL USUARIO' })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly brandId: number;
  @ApiProperty({ description: 'CATEGORIAS DEL USUARIO' })
  @IsArray()
  @IsNotEmpty()
  readonly categorysIds: number[];
}

export class UpdateAuthorDto extends PartialType(
  OmitType(CreateProductsDTO, ['name']),
) {}

export class FilterProductsDto {
  @IsOptional()
  @IsPositive()
  @ApiProperty({ description: 'LIMITE DE FILTRADO' })
  limit: number;

  @IsOptional()
  @Min(0)
  @ApiProperty({ description: 'LIMITE DE FILTRADO' })
  offset: number;

  @IsOptional()
  @IsPositive()
  @ApiProperty({ description: 'PRECIO MINIMO PARA FILTRAR' })
  minPrice: number;

  @ValidateIf((item) => item.minPrice) // DECORADOR  PARA  OBLIGAR QUE  SI PONE MIN PRICE  PONGA EL MAX PRICE
  @IsPositive()
  @ApiProperty({ description: 'PRECIO MAXIMO PARA FILTRAR' })
  maxPrice: number;
}
