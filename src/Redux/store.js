// store.js

import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import reducer from "./Reducer"; // Adjust the path as needed
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'ecom',
    storage:storage
  };
  
const persistedReducer = persistReducer(persistConfig, reducer);

export const store = createStore(
    persistedReducer
  );

export const persistor = persistStore(store);

