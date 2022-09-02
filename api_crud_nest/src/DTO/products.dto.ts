/* eslint-disable prettier/prettier */

import { PartialType } from '@nestjs/mapped-types';
import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
} from 'class-validator';

// eslint-disable-next-line prettier/prettier
export class CreateProductDTO {
  @IsString()
  @IsNotEmpty()
  //@Max(10)
  readonly name: string;
  @IsNotEmpty()
  @IsString()
  readonly description: string;
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly stock: number;
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly price: number;
  @IsNotEmpty()
  @IsUrl()
  readonly image: string;
}
export class UpdateProductDTO extends PartialType(CreateProductDTO) {}
