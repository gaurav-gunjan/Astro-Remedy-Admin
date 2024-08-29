import * as actionTypes from "../action-types";
import { call, put, takeLeading } from "redux-saga/effects";
import { ApiRequest } from "../../utils/api-function/apiRequest";
import { api_url, get_call_history, get_chat_history, } from "../../utils/api-routes";

function* getChatHistory() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.getRequest({
      url: api_url + get_chat_history,
    });

    if (response?.success) {
      yield put({
        type: actionTypes.SET_CHAT_HISTORY,
        payload: response?.history.reverse(),
      });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}

function* getCallHistory() {
  try {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: true });
    const response = yield ApiRequest.getRequest({
      url: api_url + get_call_history,
    });
    if (response?.success) {
      yield put({
        type: actionTypes.SET_CALL_HISTORY,
        payload: response?.history,
      });
    }

    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
  } catch (e) {
    yield put({ type: actionTypes.SET_IS_LOADING, payload: false });
    console.log(e);
  }
}

export default function* historySaga() {
  yield takeLeading(actionTypes.GET_CHAT_HISTORY, getChatHistory);
  yield takeLeading(actionTypes.GET_CALL_HISTORY, getCallHistory);
}