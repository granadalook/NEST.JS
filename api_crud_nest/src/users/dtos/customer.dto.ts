/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsPhoneNumber } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'NOMBRE DEL CLIENTE' })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'APELLIDO DEL CLIENTE' })
  readonly lastName: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'TELEFONO DEL CLIENTE' })
  readonly phone: string;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
