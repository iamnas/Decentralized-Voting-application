import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  userAddress: string;

  @Prop()
  name: string;

  @Prop()
  gender: string;

  @Prop()
  discordID: string;

  @Prop()
  age: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
