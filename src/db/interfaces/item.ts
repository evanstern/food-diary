import { Document } from 'mongoose';

export interface IItemInput {
  name: string;
  description: string;
}

export interface IItem {
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IItemModel extends IItem, Document {}
