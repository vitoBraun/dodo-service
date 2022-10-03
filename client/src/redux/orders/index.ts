import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { addOrder, getOrders, updateOrder } from "../../common/ApiService";
import { Order } from "../../common/models";

export const createOrderThunk = createAsyncThunk("order/add", addOrder);

export interface OrdersState {
  byId: Record<string, Order | undefined>;
  ids: string[];
  isLoading: boolean;
}

const initialState: OrdersState = {
  byId: {},
  ids: [],
  isLoading: false,
};

export const getOrdersThunk = createAsyncThunk("orders/get", getOrders);

export const updateOrderThunk = createAsyncThunk("orders/update", updateOrder);

const ordersReducer = createReducer(initialState, (builder) => {
  builder.addCase(getOrdersThunk.fulfilled, (state, action) => {
    const nextIds = action.payload.orders.map((order) => order._id);

    state.isLoading = false;

    state.ids = nextIds;
    state.byId = action.payload.orders.reduce<Record<string, Order>>(
      (acc, task) => {
        acc[task._id] = task;
        return acc;
      },
      {}
    );
  });
});

export default ordersReducer;
