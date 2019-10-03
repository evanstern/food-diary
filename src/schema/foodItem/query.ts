import {
  GraphQLNonNull,
  GraphQLList,
  Source,
  GraphQLFieldConfig,
} from 'graphql';
import mongoose from 'mongoose';

import { FoodItemType } from './types';
import { IFoodItem, IFoodItemModel } from '../../db/interfaces/foodItem';
import { GraphQLDate } from 'graphql-iso-date';

const FoodItem = mongoose.model<IFoodItemModel>('FoodItem');

interface IAllFoodItemsArgs {
  date?: Date;
}

interface IFoodSearchOptions {
  date?: Date;
}

export const allFoodItems: GraphQLFieldConfig<any, any> = {
  type: new GraphQLNonNull(new GraphQLList(FoodItemType)),
  description: 'List of all users',
  args: {
    date: { type: GraphQLDate },
  },
  resolve: async (
    _source: Source,
    { date }: IAllFoodItemsArgs
  ): Promise<IFoodItem[]> => {
    const options: IFoodSearchOptions = {};
    if (date) {
      options.date = date;
    }

    const results = await FoodItem.find(options);
    return results;
  },
};
