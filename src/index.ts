import { connectDb } from './db';
connectDb();

import app from './app';
import { logger } from './utils/logger';

const { PORT } = process.env;
app.listen(PORT, () => {
  logger.info(`App is listening on port ${PORT}`);
});
