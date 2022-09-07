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
  Index, // relacion muchos a uno
} from 'typeorm';

import { Brand } from './brand.entity'; // importacion para  relacion
import { Category } from './category.entity';

@Entity()
@Index(['price', 'stock']) // indexacionde forma conjunta en la mista entidad
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
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @ManyToOne(() => Brand, (brand) => brand.products)
  brand: Brand;

  @ManyToMany(() => Category, (category) => category.products) // relacion muchos a muchos   bidirecional
  @JoinTable() //  es para que haga  una tabla intermedia  para la relacion
  categories: Category[];
}
