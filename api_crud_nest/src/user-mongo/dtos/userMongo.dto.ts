/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty, IsEmail, Length } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateUserMongoDto {
  @IsString()
  @IsEmail()
  @ApiProperty({ description: 'EMAIL DE USUARIO' })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6)
  @ApiProperty({ description: 'PASSWORD USUARIO' /* deprecated: true */ })
  readonly password: string;

  @IsNotEmpty()
  readonly role: string;
}

export class UpdateUserMongoDto extends PartialType(CreateUserMongoDto) {}
