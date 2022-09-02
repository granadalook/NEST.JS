import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductsDTO, UpdateAuthorDto } from '../../dto/products.dto';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class ProductService {
  private contador = 2;
  private productos: Product[] = [
    {
      id: 1,
      name: 'jhon',
      description: 'granada',
      price: 1500,
      stock: 12,
      image: 'dasd',
    },
    {
      id: 2,
      name: 'vanesssa',
      description: 'palacio',
      price: 2000,
      stock: 1,
      image: 'imagen',
    },
  ];

  findAll() {
    return this.productos;
  }
  findOne(id: number) {
    const product = this.productos.find((item) => item.id === id);
    if (!product) {
      throw new NotFoundException(`PRODUCTO DE ID ${id} NO EXISTE`);
    }
    return product;
  }
  update(id: number, body: UpdateAuthorDto) {
    const product = this.findOne(id);
    if (!product) {
      throw new NotFoundException(`PRODUCTO DE ID ${id} NO EXIXTE`);
    }
    const index = this.productos.findIndex((item) => item.id === id);
    this.productos[index] = {
      ...product,
      ...body,
    };
    return this.productos[index];
  }

  create(body: CreateProductsDTO) {
    this.contador = this.contador + 1;
    const newProducto = {
      id: this.contador,
      ...body,
    };
    this.productos.push(newProducto);
    return newProducto;
  }

  delete(id: number) {
    const productDelete = this.findOne(id);
    const index = this.productos.findIndex((item) => item.id === id);
    if (!productDelete) {
      throw new NotFoundException(`PRODUCTO DE ID ${id} NO EXIXTE`);
    }
    this.productos.splice(index, 1);
    return {
      message: 'PRODUCTO ELIMINADO',
      productDelete,
    };
  }
}
