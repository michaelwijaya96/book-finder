import { combineReducers } from "redux"
import { navbarReducer } from "./components/Navbar/reducer"

export default combineReducers({
  navbar: navbarReducer,
})
