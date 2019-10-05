import mongoose from 'mongoose';

import {
  GraphQLFieldResolver,
  Source,
  GraphQLNonNull,
  GraphQLID,
} from 'graphql';

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

const doDeleteFoodItem: GraphQLFieldResolver<Source, { id: string }> = async (
  _,
  { id }
): Promise<IFoodItem> => {
  const deletedFoodItem = await FoodItem.findByIdAndRemove(id);

  if (!deletedFoodItem) {
    throw new Error(`Could not find food item with id ${id}`);
  }

  return deletedFoodItem;
};

export const deleteFoodItem = {
  type: new GraphQLNonNull(FoodItemType),
  description: 'Delete a food item',
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: doDeleteFoodItem,
};
