import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  Password: string;

  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true, unique: true })
  mobileNumber: string;

  @Prop({ required: true, enum: ['admin', 'normal'], default: 'normal' })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
