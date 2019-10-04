import {
  GraphQLNonNull,
  GraphQLList,
  Source,
  GraphQLFieldConfig,
} from 'graphql';
import mongoose from 'mongoose';

import { FoodItemType, AllFoodItemFilterInputType } from './types';
import { IFoodItem, IFoodItemModel } from '../../db/interfaces/foodItem';

const FoodItem = mongoose.model<IFoodItemModel>('FoodItem');

interface IAllFoodItemsArgs {
  filter: {
    date: {
      eq?: Date;
      lt?: Date;
      gt?: Date;
    };
    name: {
      eq?: string;
    };
  };
}

interface IFoodSearchOptions {
  date?: any;
  name?: string;
}

export const allFoodItems: GraphQLFieldConfig<any, any, IAllFoodItemsArgs> = {
  type: new GraphQLNonNull(new GraphQLList(FoodItemType)),
  description: 'List of all users',
  args: {
    filter: { type: AllFoodItemFilterInputType },
  },
  resolve: async (
    _source: Source,
    { filter }: IAllFoodItemsArgs
  ): Promise<IFoodItem[]> => {
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

    const results = await FoodItem.find(options);
    return results;
  },
};
