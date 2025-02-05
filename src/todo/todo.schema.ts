import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TodoDocument = Todo & Document;

@Schema({ timestamps: true }) // Adds createdAt and updatedAt automatically
export class Todo {
  @Prop({ required: true, minlength: 3 })
  title: string;

  @Prop({ maxlength: 200 })
  description?: string;

  @Prop({ enum: ['Not started', 'Ongoing', 'Completed'], default: 'Not started' })
  status: string;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
