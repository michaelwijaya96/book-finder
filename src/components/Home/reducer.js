import { Action } from "history"
import { ActionTypes } from "./constants"

const initialState = {
  listBook: {},
  detailBook: {},
  query: "",
}

export const homeReducer = (state = initialState, action) => {
  const { payload, type } = action
  switch (type) {
    case ActionTypes.SET_SEARCH_QUERY:
      return { ...state, query: payload.value }
    case ActionTypes.SET_LIST_BOOK:
      return { ...state, listBook: payload.value }
    case ActionTypes.SET_DETAIL_BOOK:
      return { ...state, detailBook: payload.value }
    default:
      return { ...state }
  }
}
