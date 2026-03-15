import { Type } from '@nestjs/common';
import { Prop, SchemaFactory, Virtual } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';

export class BaseSchema {
  _id: ObjectId;

  @Virtual({
    get: (doc) => doc._id.toString(),
  })
  id: string;

  @Prop({ type: Date, default: Date.now() })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now() })
  updatedAt: Date;
}

export const createSchema = <TClass = any>(target: Type<TClass>) => {
  const schema = SchemaFactory.createForClass(target);
  schema.set('toJSON', {
    virtuals: true,
  });
  schema.set('toObject', {
    virtuals: true,
  });
  schema.set('timestamps', true);
  schema.set('versionKey', false);

  return schema;
};
