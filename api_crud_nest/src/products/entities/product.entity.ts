/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier

import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  Index,
  JoinColumn, // relacion muchos a uno
} from 'typeorm';

import { Brand } from './brand.entity'; // importacion para  relacion
import { Category } from './category.entity';

@Entity({ name: 'products' }) // nombrar las tablas en plural y en minuscula
@Index(['price', 'stock']) // indexacion de forma conjunta en la mista entidad
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'text' })
  description: string;
  @Index() // para hacer indexacion y hacer las busquedas mas rapidas
  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'int' })
  stock: number;

  @Column({ type: 'varchar' })
  image: string;

  @CreateDateColumn({
    name: 'create_at', // asi se le da el nombre  para la tabla en la base de datos
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @UpdateDateColumn({
    name: 'update_at', // asi se le da el nombre  para la tabla en la base de datos
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @ManyToOne(() => Brand, (brand) => brand.products)
  @JoinColumn({ name: 'brand_id' }) // para poner el nombre de la relacion con las normas de base de datos
  brand: Brand;

  @ManyToMany(() => Category, (category) => category.products) // relacion muchos a muchos   bidirecional
  @JoinTable({
    name: 'products_categories', // nombra la trabla intermedia
    joinColumn: { name: 'product_id' }, // nombra la columna  de esta enmtidad
    inverseJoinColumn: { name: 'category_id' }, // nombra la ootra  columna de la otra entidad
  }) //  es para que haga  una tabla intermedia  para la relacion
  categories: Category[];
}
