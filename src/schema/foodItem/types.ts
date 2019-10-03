import {
  GraphQLObjectType,
  GraphQLFieldConfigMap,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLInputObjectType,
} from 'graphql';
import { GraphQLDate, GraphQLDateTime } from 'graphql-iso-date';

export const FoodItemType = new GraphQLObjectType({
  name: 'FoodItem',
  description: 'An item of food that has been consumed',
  fields: (): GraphQLFieldConfigMap<any, any> => ({
    _id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'MongoDB ObjectID',
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Name of the food item',
    },
    quantity: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The number of the food item',
    },
    calories: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The number of calories in one of these items',
    },
    date: {
      type: new GraphQLNonNull(GraphQLDate),
      description: 'The day this food item was consumed',
    },
    createdAt: {
      type: new GraphQLNonNull(GraphQLDateTime),
      description: 'Created timestamp',
    },
    updatedAt: {
      type: new GraphQLNonNull(GraphQLDateTime),
      description: 'Updated timestamp',
    },
  }),
});

export const FoodItemInputType = new GraphQLInputObjectType({
  name: 'foodItem',
  description: 'Input type for food items',
  fields: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The name of the food item',
    },
    quantity: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The number of the food item',
    },
    calories: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The number of calories in one of these items',
    },
    date: {
      type: new GraphQLNonNull(GraphQLDate),
      description: 'The day this food item was consumed',
    },
  },
});
