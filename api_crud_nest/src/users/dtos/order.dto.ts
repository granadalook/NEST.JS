/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsPositive } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateOrderDto {
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  @ApiProperty({ description: 'ID DEL CLIENTE' })
  readonly customerId: number;
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
