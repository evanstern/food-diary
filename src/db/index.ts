import mongoose from 'mongoose';

import { logger } from '../utils/logger';

const { MONGO_URI } = process.env;

export const connectDb = (): void => {
  mongoose.connect(MONGO_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

mongoose.connection.on('connected', () => {
  logger.info(`Mongoose connection open to ${MONGO_URI}`);
});

mongoose.connection.on('error', (err: Error) => {
  logger.info(`Mongoose connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
  logger.info(`Mongoose connection closed to ${MONGO_URI}`);
});

// end the connection if the node process ends
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    logger.info('Mongoose connection closed due to application termination');
    process.exit(0);
  });
});

// register all models
require('./models/item');
