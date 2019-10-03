import mongoose from 'mongoose';

import { GraphQLFieldResolver, Source, GraphQLNonNull } from 'graphql';

import {
  IFoodItemModel,
  IFoodItemInput,
  IFoodItem,
} from '../../db/interfaces/foodItem';
import { FoodItemType, FoodItemInputType } from './types';

const FoodItem = mongoose.model<IFoodItemModel>('FoodItem');

const doAddFoodItem: GraphQLFieldResolver<
  Source,
  { foodItem: IFoodItemInput }
> = async (_, { foodItem }): Promise<IFoodItem> => {
  const newFoodItem = new FoodItem({
    ...foodItem,
    isCompleted: false,
  });
  await newFoodItem.save();
  return newFoodItem;
};

export const addFoodItem = {
  type: new GraphQLNonNull(FoodItemType),
  description: 'Add a food item',
  args: {
    foodItem: { type: FoodItemInputType },
  },
  resolve: doAddFoodItem,
};
