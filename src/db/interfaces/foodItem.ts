import { Document } from 'mongoose';

export interface IFoodItemInput {
  name: string;
  quantity: number;
  calories: number;
  date: Date;
}

export interface IFoodItem {
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IFoodItemModel extends IFoodItem, Document {}
