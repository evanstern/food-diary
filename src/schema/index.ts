import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLFieldConfigMap,
} from 'graphql/type';

import {
  addFoodItem,
  allFoodItems,
  deleteFoodItem,
  foodItem,
} from './foodItem';

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'The main query',
  fields: (): GraphQLFieldConfigMap<any, any, any> => ({
    allFoodItems: { ...allFoodItems },
    foodItem: { ...foodItem },
  }),
});

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'The main mutation',
  fields: (): GraphQLFieldConfigMap<any, any> => ({
    addFoodItem: { ...addFoodItem },
    deleteFoodItem: { ...deleteFoodItem },
  }),
});

export const Schema = new GraphQLSchema({
  query: QueryType as GraphQLObjectType,
  mutation: MutationType,
});
