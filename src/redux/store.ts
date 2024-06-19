import { configureStore } from "@reduxjs/toolkit";
import { movieApi, valuesApi } from "./api.ts";
import storage from "redux-persist/lib/storage"
import {persistReducer} from "redux-persist"
import {combineReducers} from "@reduxjs/toolkit"

const persistConfig = {
  key: "root",
  version: 1,
  storage
}

const reducer = combineReducers({
  [movieApi.reducerPath]: movieApi.reducer,
  [valuesApi.reducerPath]: valuesApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(movieApi.middleware)
      .concat(valuesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
