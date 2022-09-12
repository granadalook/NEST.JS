/* eslint-disable prettier/prettier */
import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne, // para hacer la relacion uno a uno
  JoinColumn, // para hacer la relacion
  PrimaryGeneratedColumn, // para hacer tener el ID  auto incrementado
} from 'typeorm';

import { Customer } from './customer.entity'; // a quien se le va a hacer la relacion

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Exclude() // es mejor excluir de las respuestas los password  por seguridad
  @Column({ type: 'varchar', length: 255 })
  password: string; // encript

  @Column({ type: 'varchar', length: 100 })
  role: string;

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

  @OneToOne(() => Customer, (customer) => customer.user, { nullable: true })
  @JoinColumn({ name: 'customer_id' }) // crea la referencia en el momento de la relacion  se ponde  solo en donde   quien va a llevar la relacion
  customer: Customer;
}
