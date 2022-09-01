import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get()
  get(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand: string,
  ) {
    return {
      message: `products limit=> ${limit} offset=> ${offset} brand=> ${brand}`,
    };
  }

  @Get('filter')
  @HttpCode(HttpStatus.ACCEPTED)
  getFilter() {
    return { message: `yo soy un filter` };
  }

  @Get(':productId')
  getProduct(@Param('productId') productId: string) {
    return { message: `product ${productId}` };
  }
  @Post()
  create(@Body() body: any) {
    return {
      message: 'retorno mensaje',
      body,
    };
  }
  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  update(@Param('id') id: number, @Body() body: any) {
    return {
      message: 'actualizar con put',
      id,
      body,
    };
  }
  @Delete(':id')
  delete(@Param('id') id: number) {
    return {
      message: 'dato eliminado',
      id,
    };
  }
}
