import { Document } from 'mongoose';

export interface IFoodItemInput {
  name: string;
  quantity: number;
  calories: number;
  date: Date;
  createdBy: string;
}

export interface IFoodItem {
  name: string;
  description: string;
  calories: number;
  quantity: number;
  date: Date;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IFoodItemModel extends IFoodItem, Document {}
