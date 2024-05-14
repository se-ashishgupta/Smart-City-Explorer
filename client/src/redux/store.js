import { combineReducers, configureStore } from "@reduxjs/toolkit";
import miscellaneousReducer from "./features/miscellaneous";
import authReducer from "./features/auth";
import userReducer from "./features/user";
import dashboardReducer from "./features/dashboard";
import loaderReducer from "./features/loader";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
import notificationReducer from "./features/notification";

const rootReducer = combineReducers({
  miscellaneous: miscellaneousReducer,
  auth: authReducer,
  user: userReducer,
  dashboard: dashboardReducer,
  loaders: loaderReducer,
  notifications: notificationReducer,
});

const persistConfig = {
  key: "root",
  storage,
  // Add any blacklist or whitelist configurations as needed
  whitelist: ["miscellaneous", "notifications", "dashboard", "user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
