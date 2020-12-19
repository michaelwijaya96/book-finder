import { ActionTypes } from "./constants"
import HttpClient from "../../HttpClient"
import { call, takeLatest, put } from "redux-saga/effects"
import { setListBook, setIsLoading } from "./actions"

export function* onTypeSearchBarEffect(request) {
  try {
    yield put(setIsLoading(true))
    const { value } = request.payload
    const listBook = yield call(
      HttpClient.get,
      "https://www.googleapis.com/books/v1/volumes",
      null,
      {
        q: value,
        key: "AIzaSyDivamKcuuwCbb6z5Ps5gjMgGK0a6RFBoU",
        startIndex: 1,
        maxResults: 9,
      }
    )
    if (listBook.data.items !== 0) {
      yield put(setListBook(listBook))
    } else {
      yield put(setListBook({}))
    }
  } catch (e) {}
  yield put(setIsLoading(false))
}

export function* onClickPaginationEffect(request) {
  try {
    yield put(setIsLoading(true))
    const { query, value } = request.payload
    const listBook = yield call(
      HttpClient.get,
      "https://www.googleapis.com/books/v1/volumes",
      null,
      {
        q: query,
        key: "AIzaSyDivamKcuuwCbb6z5Ps5gjMgGK0a6RFBoU",
        startIndex: value * 9,
        maxResults: 9,
      }
    )
    if (listBook.data.items !== 0) {
      yield put(setListBook(listBook))
    } else {
      yield put(setListBook({}))
    }
  } catch (e) {}
  yield put(setIsLoading(false))
}

export default function* homeSaga() {
  yield takeLatest(ActionTypes.ON_TYPE_SEARCH_BAR, onTypeSearchBarEffect)
  yield takeLatest(ActionTypes.ON_CLICK_PAGINATION, onClickPaginationEffect)
}
