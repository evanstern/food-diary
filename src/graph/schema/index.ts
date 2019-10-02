import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  scalar Date

  type Item {
    _id: ID!
    name: String!
    description: String!
    isCompleted: Boolean!
    createdAt: Date!
    updatedAt: Date!
  }

  input ItemInput {
    name: String!
    description: String!
  }

  type Query {
    allItems: [Item!]!
  }

  type Mutation {
    addItem(item: ItemInput!): Item!
  }
`;
