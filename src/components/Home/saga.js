import { ActionTypes } from "./constants"
import HttpClient from "../../HttpClient"
import { call, takeLatest, put } from "redux-saga/effects"
import { setListBook, setDetailBook } from "./actions"

export function* onTypeSearchBarEffect(request) {
  try {
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
}

export function* onClickBookLinkEffect(request) {
  //Self Link from Response List Book
  try {
    const { value } = request.payload
    const detailBook = yield call(HttpClient.get, value)
    yield put(setDetailBook(detailBook))
    //Portal to Detail Page
  } catch (e) {}
}

export function* onClickPaginationEffect(request) {
  try {
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
}

export default function* homeSaga() {
  yield takeLatest(ActionTypes.ON_TYPE_SEARCH_BAR, onTypeSearchBarEffect)
  yield takeLatest(ActionTypes.ON_CLICK_PAGINATION, onClickPaginationEffect)
}
