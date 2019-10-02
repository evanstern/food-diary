import mongoose from 'mongoose';

const removeAllCollections = (): void => {
  const { collections } = mongoose.connection;
  Object.keys(collections).forEach(async collectionName => {
    const collection = mongoose.connection.collections[collectionName];
    await collection.deleteMany({});
  });
};

const dropAllCollections = (): void => {
  const { collections } = mongoose.connection;
  Object.keys(collections).forEach(async collectionName => {
    const collection = mongoose.connection.collections[collectionName];
    try {
      await collection.drop();
    } catch (err) {
      // this can be ignored
      if (err.message === 'ns not found') {
        return;
      }

      // this can happen if you use `it.todo`, it can be ignored
      if (err.message.includes('a background operation is currently running')) {
        return;
      }

      console.log(err);
    }
  });
};

export const setupDb = (dbName: string): void => {
  beforeAll(async () => {
    const uri = `mongodb://127.0.0.1/${dbName}`;
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterEach(() => {
    removeAllCollections();
  });

  afterAll(async () => {
    dropAllCollections();
    await mongoose.connection.close();
  });
};
