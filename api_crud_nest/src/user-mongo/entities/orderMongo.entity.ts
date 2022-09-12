/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Product } from '../../produc-mongo/entities/productMongo.entiti';
import { Customer } from '../entities/custumerMongo.entity';

@Schema()
export class Order extends Document {
  @Prop({ type: Date })
  date: Date;

  @Prop({ type: Types.ObjectId, ref: Customer.name, required: true })
  customer: Customer | Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: Product.name }] }) // asi se  referencia  una entidad
  products: Types.Array<Product>;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
