import { isNotAuthorized } from "../../common/ApiService";
import { clearUserInfo } from "./index";

const authMiddleware = (store: any) => (dispatch: any) => (action: any) => {
  if (action.error && isNotAuthorized(action.error)) {
    dispatch(clearUserInfo());
  }
  dispatch(action);
};

export default authMiddleware;
