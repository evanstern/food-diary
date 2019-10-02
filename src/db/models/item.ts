import { Schema, model, Model } from 'mongoose';

import { IItemModel } from '../interfaces/item';

export const ItemSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Item: Model<IItemModel> = model<IItemModel>('Item', ItemSchema);
