import {
  GraphQLNonNull,
  GraphQLList,
  Source,
  GraphQLFieldConfig,
} from 'graphql';
import mongoose from 'mongoose';

import {
  FoodItemType,
  AllFoodItemFilterInputType,
  AllFoodItemOrderByInputType,
} from './types';
import { IFoodItem, IFoodItemModel } from '../../db/interfaces/foodItem';

const FoodItem = mongoose.model<IFoodItemModel>('FoodItem');

interface IFoodSearchOptions {
  date?: any;
  name?: string;
}

enum FoodItemDirection {
  ASC = 'asc',
  DESC = 'desc',
}

interface IAllFoodItemsArgs {
  filter: {
    date?: {
      eq?: Date;
      lt?: Date;
      gt?: Date;
    };
    name?: {
      eq?: string;
    };
  };
  orderBy: {
    field?: string;
    direction?: FoodItemDirection;
  };
}

export const allFoodItems: GraphQLFieldConfig<any, any, IAllFoodItemsArgs> = {
  type: new GraphQLNonNull(new GraphQLList(FoodItemType)),
  description: 'List of all users',
  args: {
    filter: { type: AllFoodItemFilterInputType },
    orderBy: { type: AllFoodItemOrderByInputType },
  },
  resolve: async (
    _source: Source,
    { filter = {}, orderBy = {} }: IAllFoodItemsArgs
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

    const sortOptions: { [name: string]: number } = {};
    if (orderBy.field) {
      sortOptions[orderBy.field] =
        orderBy.direction === FoodItemDirection.DESC ? -1 : 1;
    }

    const results = await FoodItem.find(options).sort(sortOptions);
    return results;
  },
};
