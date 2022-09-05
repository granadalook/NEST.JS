/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductsDTO, UpdateAuthorDto } from '../../dto/products.dto';
import { Product } from '../../entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  findAll() {
    return this.productRepo.find();
  }
  async findOnePro(id: number) {
    const product = await this.productRepo.findOneById(id);
    if (!product) {
      throw new NotFoundException(`PRODUCTO DE ID ${id} NO EXISTE`);
    }
    return product;
  }

  create(body: CreateProductsDTO) {
      const newProducto = this.productRepo.create(body);
      return this.productRepo.save(newProducto);
  }

  async update(id: number, body: UpdateAuthorDto) {
    const product = await this.findOnePro(id);
    if (!product) {
      throw new NotFoundException(`PRODUCTO DE ID ${id} NO EXIXTE`);
    }
    this.productRepo.merge(product, body);
    return this.productRepo.save(product);
  }

  async delete(id: number) {
    const productDelete = await this.findOnePro(id);
    console.log('productDelete', productDelete);
    if (!productDelete) {
      throw new NotFoundException(`PRODUCTO DE ID ${id} NO EXIXTE`);
    }
    this.productRepo.delete(id);
    return {
      message: 'PRODUCTO ELIMINADO',
      productDelete,
    };
  }
}
/*



  */
