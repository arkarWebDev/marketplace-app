import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";

import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

import userReducer from "./slices/userSlice";
import loaderReducer from "./slices/loaderSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const combinedReducers = combineReducers({
  user: userReducer,
  loader: loaderReducer,
});

const persist_reducer = persistReducer(persistConfig, combinedReducers);

const store = configureStore({
  reducer: {
    reducer: persist_reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: false,
});

export default store;
