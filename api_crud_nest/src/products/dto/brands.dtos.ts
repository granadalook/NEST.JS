/* eslint-disable prettier/prettier */
import { IsString, IsUrl, IsNotEmpty } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateBrandDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'NOMBRE DE LA MARCA' })
  readonly name: string;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({ description: 'IMAGEN DE LA MARCA' })
  readonly image: string;
}

export class UpdateBrandDto extends PartialType(CreateBrandDto) {}
