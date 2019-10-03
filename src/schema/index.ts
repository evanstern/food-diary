import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLFieldConfigMap,
} from 'graphql/type';

import { addFoodItem, allFoodItems } from './foodItem';

const QueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'The main query',
  fields: (): GraphQLFieldConfigMap<any, any> => ({
    allFoodItems: { ...allFoodItems },
  }),
});

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  description: 'The main mutation',
  fields: (): GraphQLFieldConfigMap<any, any> => ({
    addFoodItem: { ...addFoodItem },
  }),
});

export const Schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});
