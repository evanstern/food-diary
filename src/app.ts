import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { ApolloServer } from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';
import cors from 'cors';
import path from 'path';

import { Schema } from './schema';

const app: Application = express();

app.use(bodyParser.json());
app.use(cors());

const client = jwksClient({
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
});

const getKey = (header: any, callback: any): void => {
  client.getSigningKey(header.kid, (_err, key: any) => {
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
};

const options = {
  audience: process.env.AUTH0_CLIENT_ID,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256'],
};

const apolloServer = new ApolloServer({
  schema: Schema,
  context: ({ req }): any => {
    const token =
      req.headers.authorization && req.headers.authorization.split(' ').pop();

    const user = new Promise((resolve, reject): void => {
      jwt.verify(token || '', getKey, options, (err, decoded) => {
        if (err) {
          reject(err);
        }
        resolve(decoded);
      });
    });
    return { user };
  },
});

apolloServer.applyMiddleware({ app });

app.use(express.static(__dirname + '/../client/build/'));
app.get('*', (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname + '/../client/build/index.html'));
});

export default app;
