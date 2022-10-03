console.log("logger module init...");

const logger = (store: any) => (dispatch: any) => (action: any) => {
  console.log(`Dispatching ${action.type}`);
  dispatch(action);
};

export default logger;
