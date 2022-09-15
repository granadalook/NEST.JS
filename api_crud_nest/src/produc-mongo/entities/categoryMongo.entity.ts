/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Category extends Document {
  @Prop({ unique: true })
  id: string;

  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  image: string;
}
export const CategorySchema = SchemaFactory.createForClass(Category);
