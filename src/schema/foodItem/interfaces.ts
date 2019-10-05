import { IFoodItem } from '../../db/interfaces/foodItem';

export interface IFoodSearchOptions {
  date?: any;
  name?: string;
}

export enum FoodItemDirection {
  ASC = 'asc',
  DESC = 'desc',
}

export interface IAllFoodItemsArgs {
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
  [key: string]: any;
}

export interface IAllFoodItems {
  items: IFoodItem[];
  totalCalories: number;
  totalQuantity: number;
}

export interface IFoodItemArgs {
  id: string;
}
