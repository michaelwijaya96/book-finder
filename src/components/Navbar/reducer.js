import { ActionTypes } from "./constants"

const initialState = {
  value: "HOME",
}

export const navbarReducer = (state = initialState, action) => {
  const { payload, type } = action
  switch (type) {
    case ActionTypes.SET_NAVBAR_VALUE:
      return { ...state, value: payload.value }
    default:
      return { ...state }
  }
}
