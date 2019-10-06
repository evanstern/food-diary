import { Schema, model, Model } from 'mongoose';

import { IFoodItemModel } from '../interfaces/foodItem';

export const FoodItemSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    calories: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Item: Model<IFoodItemModel> = model<IFoodItemModel>(
  'FoodItem',
  FoodItemSchema
);
