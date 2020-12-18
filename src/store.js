import { createStore, applyMiddleware } from "redux"

import { middleware } from "./middleware"
import { composeWithDevTools } from "redux-devtools-extension"

export const store = createStore(
  composeWithDevTools(applyMiddleware(...middleware))
)
