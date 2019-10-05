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

const FoodItem = mongoose.model<IFoodItemModel>('FoodItem');

export const foodItem: GraphQLFieldConfig<any, any, IFoodItemArgs> = {
  type: FoodItemType,
  description: 'Get a food item',
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: async (
    _source: Source,
    { id }: IFoodItemArgs
  ): Promise<IFoodItem> => {
    const foodItem = await FoodItem.findById(id);

    if (!foodItem) {
      throw new Error(`Could not find a food item with id ${id}`);
    }

    return foodItem;
  },
};

export const allFoodItems: GraphQLFieldConfig<any, any, IAllFoodItemsArgs> = {
  type: AllFoodItemsType,
  description: 'List of all users',
  args: {
    filter: { type: AllFoodItemFilterInputType },
    orderBy: { type: AllFoodItemOrderByInputType },
  },
  resolve: async (
    _source: Source,
    { filter = {}, orderBy = {} }: IAllFoodItemsArgs
  ): Promise<IAllFoodItems> => {
    const options: IFoodSearchOptions = {};

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
