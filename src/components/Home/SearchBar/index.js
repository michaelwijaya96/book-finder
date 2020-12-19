import PropTypes from "prop-types"
import Input from "@material-ui/core/Input"

const SearchBar = (props) => {
  return <Input onChange={props.onChange}></Input>
}

export default SearchBar
