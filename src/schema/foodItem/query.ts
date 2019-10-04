import { Source, GraphQLFieldConfig } from 'graphql';
import mongoose from 'mongoose';

import {
  AllFoodItemFilterInputType,
  AllFoodItemOrderByInputType,
  AllFoodItemsType,
} from './types';
import {
  IAllFoodItemsArgs,
  IFoodSearchOptions,
  FoodItemDirection,
  IAllFoodItems,
} from './interfaces';
import { IFoodItemModel, IFoodItem } from '../../db/interfaces/foodItem';

const FoodItem = mongoose.model<IFoodItemModel>('FoodItem');

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
