import { Source, GraphQLFieldConfig, GraphQLNonNull, GraphQLID } from 'graphql';
import mongoose from 'mongoose';

import {
  AllFoodItemFilterInputType,
  AllFoodItemOrderByInputType,
  AllFoodItemsType,
  FoodItemType,
} from './types';
import {
  IAllFoodItemsArgs,
  IFoodSearchOptions,
  FoodItemDirection,
  IAllFoodItems,
  IFoodItemArgs,
} from './interfaces';
import { IFoodItemModel, IFoodItem } from '../../db/interfaces/foodItem';
import { IUser } from '../../db/interfaces/user';

const FoodItem = mongoose.model<IFoodItemModel>('FoodItem');

export const foodItem: GraphQLFieldConfig<any, any, IFoodItemArgs> = {
  type: FoodItemType,
  description: 'Get a food item',
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async (
    _source: Source,
    { id }: IFoodItemArgs,
    { user }: { user: Promise<IUser> }
  ): Promise<IFoodItem> => {
    const u = await user;

    const foodItem = await FoodItem.findById(id);

    if (!foodItem) {
      throw new Error(`Could not find a food item with id ${id}`);
    }

    if (foodItem.createdBy !== u.sub) {
      throw new Error(`You do not own this food item`);
    }

    return foodItem;
  },
};

export const allFoodItems: GraphQLFieldConfig<any, any, IAllFoodItemsArgs> = {
  type: AllFoodItemsType,
  description: 'List of all food items limited by user',
  args: {
    filter: { type: AllFoodItemFilterInputType },
    orderBy: { type: AllFoodItemOrderByInputType },
  },
  resolve: async (
    _source: Source,
    { filter = {}, orderBy = {} }: IAllFoodItemsArgs,
    { user }: { user: Promise<IUser> }
  ): Promise<IAllFoodItems> => {
    const u = await user;

    const options: IFoodSearchOptions = {
      createdBy: u.sub,
    };

    const { date, name } = filter;

    if (date && date.eq) {
      options.date = date.eq;
    }

    if (date && date.lt) {
      options.date = { $lt: date.lt };
    }

    if (date && date.gt) {
      options.date = { $gt: date.gt };
    }

    if (name && name.eq) {
      options.name = name.eq;
    }

    const sortOptions: { [name: string]: number } = {};
    if (orderBy.field) {
      sortOptions[orderBy.field] =
        orderBy.direction === FoodItemDirection.DESC ? -1 : 1;
    }

    const results: IFoodItem[] = await FoodItem.find(options).sort(sortOptions);

    const totalCalories: number = results.reduce(
      (acc, cur) => acc + cur.calories * cur.quantity,
      0
    );

    const totalQuantity: number = results.reduce(
      (acc, cur) => acc + cur.quantity,
      0
    );

    return {
      items: results,
      totalCalories,
      totalQuantity,
    };
  },
};
