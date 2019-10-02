import supertest from 'supertest';
import mongoose from 'mongoose';

import { setupDb } from '../test-helpers';
import { IItemModel } from '../db/models/item';

setupDb('endpoint-tests');

// this has to happen before `app` is imported in order to register the models
require('../db');
import app from '../app';

const request = supertest(app);
const Item = mongoose.model<IItemModel>('Item');

describe('items endpoint', () => {
  it('gets the items endpoint', async done => {
    const item: IItemModel = new Item({
      name: 'Foo',
      description: 'Bar',
    });
    await item.save();

    const res = await request.get('/items');

    expect(res.body.length).toEqual(1);
    expect(res.body[0].name).toEqual('Foo');
    expect(res.body[0].description).toEqual('Bar');

    done();
  });
});
