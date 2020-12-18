import createSagaMiddleware from "redux-saga"
import { routerMiddleware } from "react-router-redux"
import createHistory from "history/createHashHistory"

const history = createHistory()
const router = routerMiddleware(history)
const sagaMiddleware = createSagaMiddleware()

export const middleware = [router, sagaMiddleware]
