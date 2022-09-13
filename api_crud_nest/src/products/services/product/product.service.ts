/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateProductsDTO,
  FilterProductsDto,
  UpdateAuthorDto,
} from '../../dto/products.dto';
import { Product } from '../../entities/product.entity';
import { Between, FindOptionsWhere, In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../../entities/category.entity';
import { Brand } from '../../entities/brand.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Brand) private brandsRepo: Repository<Brand>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>, //injesciones  derepositorio para hacer gestion directamente en la data //private brandsService: BrandsService,
  ) {}

  findAll(params?: FilterProductsDto) {
    if (params) {
      const where: FindOptionsWhere<Product> = {};
      const { limit, offset } = params;
      const { maxPrice, minPrice } = params;
      if (minPrice && maxPrice) {
        where.price = Between(minPrice, maxPrice);
      }
      return this.productRepo.find({
        relations: ['brand'],
        where,
        take: limit,
        skip: offset,
      });
    }
    return this.productRepo.find({
      relations: ['brand'],
    });
  }
  async findOnePro(id: number) {
    const product = await this.productRepo.findOne({
      where: { id }, //   de esta manera le pido que en el get  me traiga estas dos relaciones
      relations: ['brand', 'categories'],
    });
    if (!product) {
      throw new NotFoundException(`PRODUCTO DE ID ${id} NO EXISTE`);
    }
    return product;
  }

  async create(body: CreateProductsDTO) {
    const newProducto = this.productRepo.create(body);

    if (body.brandId) {
      // relaciona las marcas de los productos
      const brand = await this.brandsRepo.findOneBy({ id: body.brandId });
      newProducto.brand = brand;
    }
    if (body.categorysIds) {
      const categories = await this.categoryRepo.findBy({
        id: In(body.categorysIds),
      }); // se manda una serie  de id para que la tabla los devuelva
      newProducto.categories = categories;
    }
    return this.productRepo.save(newProducto);
  }

  async update(id: number, body: UpdateAuthorDto) {
    const product = await this.findOnePro(id);
    if (body.brandId) {
      const brand = await this.brandsRepo.findOneBy({ id: body.brandId });
      product.brand = brand;
    }
    if (body.categorysIds) {
      const categories = await this.categoryRepo.findBy({
        id: In(body.categorysIds),
      }); // se manda una serie  de id para que la tabla los devuelva
      product.categories = categories;
    }
    if (!product) {
      throw new NotFoundException(`PRODUCTO DE ID ${id} NO EXIXTE`);
    }
    this.productRepo.merge(product, body);
    return this.productRepo.save(product);
  }

  async delete(id: number) {
    const productDelete = await this.findOnePro(id);
    if (!productDelete) {
      throw new NotFoundException(`PRODUCTO DE ID ${id} NO EXIXTE`);
    }
    this.productRepo.delete(id);
    return {
      message: 'PRODUCTO ELIMINADO',
      productDelete,
    };
  }

  async deleteCategoriesByProduct(id: number, categoryId: number) {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['categories'],
    });

    product.categories = product.categories.filter(
      (item) => item.id !== categoryId,
    );
    return this.productRepo.save(product);
  }

  async addCatedoryToProduct(id: number, categoryId: number) {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['categories'],
    });
    const category = await this.categoryRepo.findOneBy({ id: categoryId });
    product.categories.push(category);

    return this.productRepo.save(product);
  }
}
