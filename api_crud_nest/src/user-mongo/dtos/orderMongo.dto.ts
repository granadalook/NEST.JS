/* eslint-disable prettier/prettier */
import { IsMongoId, IsNotEmpty, IsDate, IsArray } from 'class-validator';
import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';

export class CreateOrderMongoDto {
  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty({ description: `NOMBRE DEL CLIENTE PARA LA ORDEN` })
  readonly customer: string;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty({ description: `FECHA DE LA ORDEN` })
  readonly date: Date;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({ description: `PRODUCTOS DE LA ORDEN` })
  readonly products: string[];
}

export class UpdateOrderMongoDto extends PartialType(
  OmitType(CreateOrderMongoDto, ['products']), //  omitype   omite
) {}
export class AddProductsToOrderMongoDto {
  @IsArray()
  @IsNotEmpty()
  @ApiProperty({ description: `ID DE LOS PRODUCTOS` })
  readonly productsIds: string[];
}
