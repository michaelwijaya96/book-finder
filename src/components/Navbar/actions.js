import { ActionTypes } from "./constants"

export const setValue = (value) => {
  return {
    type: ActionTypes.SET_NAVBAR_VALUE,
    payload: { value },
  }
}
