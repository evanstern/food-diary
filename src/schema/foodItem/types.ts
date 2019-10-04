import {
  GraphQLObjectType,
  GraphQLFieldConfigMap,
  GraphQLNonNull,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLInputObjectType,
  GraphQLEnumType,
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

const DateInputType = new GraphQLInputObjectType({
  name: 'dateFilter',
  description: 'Filter on a date',
  fields: {
    eq: {
      type: GraphQLDate,
      description: 'The date equals this date',
    },
    lt: {
      type: GraphQLDate,
      description: 'The date is less than this date',
    },
    gt: {
      type: GraphQLDate,
      description: 'The date is greater than this date',
    },
  },
});

const NameInputType = new GraphQLInputObjectType({
  name: 'nameFilter',
  description: 'Filter on a name',
  fields: {
    eq: {
      type: GraphQLString,
      description: 'The name matches this name',
    },
  },
});

export const AllFoodItemFilterInputType = new GraphQLInputObjectType({
  name: 'foodItemFilter',
  description: 'Filter for food items',
  fields: {
    date: {
      type: DateInputType,
      description: 'Filter on the date',
    },
    name: {
      type: NameInputType,
      description: 'Filter on the name',
    },
  },
});

export const AllFoodItemOrderEnum = new GraphQLEnumType({
  name: 'foodItemOrderBy',
  values: {
    ASC: { value: 'asc' },
    DESC: { value: 'desc' },
  },
});

export const AllFoodItemOrderByInputType = new GraphQLInputObjectType({
  name: 'foodItemOrderBy',
  description: 'Order by field',
  fields: {
    direction: { type: AllFoodItemOrderEnum },
    fieldName: { type: GraphQLString },
  },
});
