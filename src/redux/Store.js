import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga/rootSaga";
import appReducer from "./reducers/root";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: appReducer,
  middleware: () => [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;
