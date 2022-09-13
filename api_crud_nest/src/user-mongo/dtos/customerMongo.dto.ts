/* eslint-disable prettier/prettier */
import {
  IsString,
  IsNotEmpty,
  IsPhoneNumber,
  IsArray,
  // ValidateNested,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateCustomerMongoDto {
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

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({ description: 'HABILIDADES DEL CLIENTE' })
  readonly skills: any;
}

export class UpdateCustomerMongoDto extends PartialType(
  CreateCustomerMongoDto,
) {}
