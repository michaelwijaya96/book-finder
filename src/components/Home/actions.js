import { ActionTypes } from "./constants"

export const onTypeSearchBar = (value) => {
  return {
    type: ActionTypes.ON_TYPE_SEARCH_BAR,
    payload: { value },
  }
}

export const onClickBookLink = (history, id, value) => {
  return {
    type: ActionTypes.ON_CLICK_BOOK_LINK,
    payload: { history, id, value },
  }
}

export const onClickPagination = (query, value) => {
  return {
    type: ActionTypes.ON_CLICK_PAGINATION,
    payload: { query, value },
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

export const setIsLoading = (value) => {
  return {
    type: ActionTypes.SET_IS_LOADING,
    payload: { value },
  }
}
