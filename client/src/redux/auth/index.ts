import {
  createAction,
  createAsyncThunk,
  createReducer,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";

import {
  checkStatus,
  login,
  logout,
  register,
  UserInfo,
} from "../../common/ApiService";

export interface AuthState {
  userInfo?: UserInfo;
  isLoading: boolean;
}

const initialState: AuthState = {
  isLoading: false,
};

export const clearUserInfo = createAction("auth/clear");

export const registerUserThunk = createAsyncThunk(
  "auth/register",
  (userData: { email: string; password: string }) => {
    return register(userData);
  }
);

export const loginUserThunk = createAsyncThunk(
  "auth/login",
  (userData: { email: string; password: string }) => {
    return login(userData.email, userData.password);
  }
);

export const logoutUserThunk = createAsyncThunk("auth/logout", logout);

export const checkAuthenticationThunk = createAsyncThunk(
  "auth/check",
  checkStatus
);

const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(clearUserInfo, (state) => {
      state.userInfo = undefined;
    })
    .addCase(checkAuthenticationThunk.fulfilled, (state, action) => {
      if (action.payload.isAuthenticated) {
        state.userInfo = action.payload.userInfo;
      } else {
        state.userInfo = undefined;
      }
      state.isLoading = false;
    })
    .addCase(logoutUserThunk.fulfilled, (state) => {
      state.userInfo = undefined;
      state.isLoading = false;
    })
    .addMatcher(
      isFulfilled(loginUserThunk, registerUserThunk),
      (state, action) => {
        state.userInfo = action.payload;
        state.isLoading = false;
      }
    )
    .addMatcher(
      isPending(
        loginUserThunk,
        registerUserThunk,
        logoutUserThunk,
        checkAuthenticationThunk
      ),
      (state) => {
        state.isLoading = true;
      }
    )
    .addMatcher(
      isRejected(
        loginUserThunk,
        registerUserThunk,
        logoutUserThunk,
        checkAuthenticationThunk
      ),
      (state) => {
        state.isLoading = false;
      }
    );
});

export default authReducer;
