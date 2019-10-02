import mongoose from 'mongoose';

import { IItemModel, IItemInput, IItem } from '../../db/interfaces/item';

const Item = mongoose.model<IItemModel>('Item');

export const Query = {
  allItems: async (): Promise<IItem[]> => {
    const results = await Item.find();
    return results;
  },
};

export const Mutation = {
  addItem: async (_, { item }: { item: IItemInput }): Promise<IItem> => {
    const newItem = new Item({
      ...item,
      isCompleted: false,
    });
    await newItem.save();
    return newItem;
  },
};
