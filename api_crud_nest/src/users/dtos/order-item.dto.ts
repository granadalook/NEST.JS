/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsPositive } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateOrderItemDto {
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ description: 'ID DE LA ORDEN' })
  readonly orderId: number;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ description: 'ID DEL PRODUCTO' })
  readonly productId: number;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ description: 'CANTIDAD DE PRODUCTOS' })
  readonly quantity: number;
}

export class UpdateOrderItemDto extends PartialType(CreateOrderItemDto) {}
