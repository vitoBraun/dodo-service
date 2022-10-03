interface Params {
  urlFromPayload: (payload: any) => string;
  initActionType: string;
  fulfilledActionType: string;
  stopActionType: string;
}

export default function createSSEMiddleware(params: Params) {
  let eventSource: EventSource;
  return (store: any) => (dispatch: any) => (action: any) => {
    if (action.type === params.initActionType) {
      const url = params.urlFromPayload(action.payload);
      eventSource = new EventSource(url, { withCredentials: true });
      eventSource.onmessage = (event) => {
        const payload = JSON.parse(event.data);
        dispatch({
          type: params.fulfilledActionType,
          meta: { arg: action.payload },
          payload,
        });
      };
      eventSource.onerror = (event) => {
        console.error(event);
      };
    } else if (action.type === params.stopActionType) {
      eventSource?.close();
    }
    dispatch(action);
  };
}
