import { createStore, applyMiddleware } from "redux"

import { middleware } from "./middleware"
import { composeWithDevTools } from "redux-devtools-extension"
import reducer from "./reducer"

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
)
