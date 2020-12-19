import createSagaMiddleware from "redux-saga"

const sagaMiddleware = createSagaMiddleware()

export const middleware = [sagaMiddleware]
