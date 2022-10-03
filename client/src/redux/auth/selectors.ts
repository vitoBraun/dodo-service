import { RootState } from "../../store";

export const selectUserInfo = (state: RootState) => state.auth.userInfo;

export const selectAuth = (state: RootState) => state.auth;

export const selectIsAdmin = (state: RootState) =>
  state.auth.userInfo?.type === "admin";
