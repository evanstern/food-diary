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
import { IUser } from '../../db/interfaces/user';
import { FoodItemType, FoodItemInputType } from './types';

const FoodItem = mongoose.model<IFoodItemModel>('FoodItem');

const doAddFoodItem: GraphQLFieldResolver<
  Source,
  { user: Promise<IUser> }
> = async (
  _,
  { foodItem },
  { user }: { user: Promise<IUser> }
): Promise<IFoodItem> => {
  const u = await user;

  const newFoodItem = new FoodItem({
    ...foodItem,
    createdBy: u.sub,
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

const doDeleteFoodItem: GraphQLFieldResolver<
  Source,
  { user: Promise<IUser> }
> = async (_, { id }, { user }): Promise<IFoodItem> => {
  const u = await user;

  const foodItem = await FoodItem.findById(id);
  if (!foodItem) {
    throw new Error(`Could not find food item with id ${id}`);
  }

  if (foodItem.createdBy !== u.sub) {
    throw new Error('You must own the food item to delete it');
  }

  await foodItem.remove();

  return foodItem;
};

export const deleteFoodItem = {
  type: new GraphQLNonNull(FoodItemType),
  description: 'Delete a food item',
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: doDeleteFoodItem,
};
