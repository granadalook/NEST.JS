/* eslint-disable prettier/prettier */
import { IsString, IsUrl, IsNotEmpty } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';


export class CreateBrandMongoDto {
  id: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: `NOMBRE DE LA MARCA` })
  readonly name: string;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({ description: `IMAGEN DE LA MARCA` })
  readonly image: string;
}

export class UpdateBrandMongoDto extends PartialType(CreateBrandMongoDto) {}
