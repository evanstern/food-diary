import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import path from 'path';

import { Schema } from './schema';

const app: Application = express();

app.use(bodyParser.json());
app.use(cors());

const apolloServer = new ApolloServer({
  schema: Schema,
});

apolloServer.applyMiddleware({ app });

app.get('*', (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

export default app;
