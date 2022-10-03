import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./redux/auth";
import ordersReducer from './redux/orders'
import authMiddleware from "./redux/auth/middleware";

const store = configureStore({
  reducer: {
    auth: authReducer,
    orders: ordersReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([authMiddleware]),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
