/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';

import { Document, Types } from 'mongoose';

import { Brand } from '../entities/brandMongo.entity';

@Schema()
export class Product extends Document {
  @Prop({ required: true, unique: true })
  id: number;
  @Prop({ required: true })
  name: string;

  @Prop() // significa que va a hacer una propiedad
  description: string;

  @Prop({ type: Number, index: true }) // indexacion
  price: number;

  @Prop({ type: Number, required: true })
  stock: number;

  @Prop({ unique: true })
  image: string;

  @Prop(
    raw({
      name: { type: String },
      image: { type: String },
    }),
  )
  category: Record<string, any>;

  @Prop({ type: Types.ObjectId, ref: Brand.name }) //  asi se hacen las relaciones referenciadas
  brand: Brand | Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.index({ price: 1, stock: -1 });
