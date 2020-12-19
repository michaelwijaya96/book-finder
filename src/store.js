import { createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import reducer from "./reducer"
import createSagaMiddleware from "redux-saga"
import homeSaga from "./components/Home/saga"

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
)
sagaMiddleware.run(homeSaga)
