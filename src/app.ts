import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';

import { typeDefs } from './graph/schema';
import { resolvers } from './graph/resolvers';

const Item = mongoose.model('Item');

const app: Application = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/items', async (_req, res) => {
  const items = await Item.find();
  res.send(items);
});

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

apolloServer.applyMiddleware({ app });

app.get('*', (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

export default app;
