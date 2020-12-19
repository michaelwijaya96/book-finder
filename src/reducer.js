import { combineReducers } from "redux"
import { navbarReducer } from "./components/Navbar/reducer"
import { homeReducer } from "./components/Home/reducer"

export default combineReducers({
  navbar: navbarReducer,
  home: homeReducer,
})
