/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'; // IMPORTACION

@Entity({ name: 'products' }) // SE DECLARA LA ENTIDAD
export class Product {
  @PrimaryGeneratedColumn() // GENERA UNA LLAVE PARA LA BD
  id: number;
  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;
  @Column({ type: 'text' })
  description: string;
  @Column({ type: 'int' })
  price: number;
  @Column({ type: 'int' })
  stock: number;
  @Column({ type: 'varchar' })
  image: string;
}
