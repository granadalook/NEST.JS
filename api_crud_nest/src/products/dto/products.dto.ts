/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, IsNumber, IsUrl } from 'class-validator';
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
}

export class UpdateAuthorDto extends PartialType(
  OmitType(CreateProductsDTO, ['name']),
) {}
