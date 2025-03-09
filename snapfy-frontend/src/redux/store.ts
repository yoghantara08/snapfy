import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { persistStore } from "redux-persist";
import autoMergeLevel1 from "redux-persist/lib/stateReconciler/autoMergeLevel1";

import modalReducer from "./reducers/modalSlice";
import storage from "./storage";

const persistConfig = {
  key: "snapfy_state",
  storage,
  stateReconciler: autoMergeLevel1,
  blacklist: ["modal"],
};

const rootReducer = combineReducers({
  modal: modalReducer,
});

type RootReducerType = ReturnType<typeof rootReducer>;

const persistedReducer = persistReducer<RootReducerType>(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

const persistor = persistStore(store);

export { persistor, store };
export type { AppDispatch, RootState };
