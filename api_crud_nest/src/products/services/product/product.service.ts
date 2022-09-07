/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductsDTO, UpdateAuthorDto } from '../../dto/products.dto';
import { Product } from '../../entities/product.entity';
import { In, Repository } from 'typeorm';
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

  findAll() {
    return this.productRepo.find({ relations: ['brand'] }); // para que me traiga la relacion en el get
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
