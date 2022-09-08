/* eslint-disable prettier/prettier */
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Length,
  IsPositive,
  IsOptional,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  @ApiProperty({ description: 'EMAIL DEL USUARIO' })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6)
  @ApiProperty({ description: 'PASSWORD DEL USUARIO' })
  readonly password: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'ROL DEL USUARIO' })
  readonly role: string;

  @IsPositive()
  @IsOptional()
  @ApiProperty({ description: 'ID DE CLIENTE' })
  readonly customerId: number;  //  en el DTO  se pone la   relacion
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
