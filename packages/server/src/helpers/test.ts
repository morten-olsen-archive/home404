import { Reducer, Data } from '@home/sdk';
import create from '../state/create';

interface TestStoreOptions {
  reducers?: {[name: string]: Reducer};
  initialState?: Data;
}

const createTestStore = async ({ reducers, initialState }: TestStoreOptions) => {
  const store = create(undefined, {
    reducers,
  });

  if (initialState) {
    await store.dispatch({
      type: '@@STATE/REPLACE',
      payload: initialState,
    });
  }

  return store;
}

export {
  createTestStore,
}