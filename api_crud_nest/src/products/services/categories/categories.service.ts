/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
} from 'src/products/dto/category.dtos';
import { Category } from '../../entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  findAll() {
    return this.categoryRepo.find();
  }

  async findOne(id: number) {
    const category = await this.categoryRepo.findOne({
      where: { id }, //   de esta manera le pido que en el get  me traiga estas dos relaciones
      relations: ['products'],
    });
    if (!category) {
      throw new NotFoundException(`CATEGORIA  ${id} NO EXISTE`);
    }
    return category;
  }

  create(data: CreateCategoryDto) {
    const newCategory = this.categoryRepo.create(data);
    return this.categoryRepo.save(newCategory);
  }

  async update(id: number, changes: UpdateCategoryDto) {
    const category = await this.findOne(id);
    this.categoryRepo.merge(category, changes);
    return this.categoryRepo.save(category);
  }

  remove(id: number) {
    return this.categoryRepo.delete(id);
  }
}
