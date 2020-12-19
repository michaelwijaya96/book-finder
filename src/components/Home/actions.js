import { ActionTypes } from "./constants"

export const onTypeSearchBar = (value) => {
  return {
    type: ActionTypes.ON_TYPE_SEARCH_BAR,
    payload: { value },
  }
}

export const onClickBookLink = (value) => {
  return {
    type: ActionTypes.ON_CLICK_BOOK_LINK,
    payload: { value },
  }
}

export const setSearchQuery = (value) => {
  return {
    type: ActionTypes.SET_SEARCH_QUERY,
    payload: { value },
  }
}

export const setListBook = (value) => {
  return {
    type: ActionTypes.SET_LIST_BOOK,
    payload: { value },
  }
}

export const setDetailBook = (value) => {
  return {
    type: ActionTypes.SET_DETAIL_BOOK,
    payload: { value },
  }
}
