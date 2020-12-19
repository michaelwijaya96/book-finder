import React, { Component } from "react"
import { Tabs } from "material-ui"
import { Tab } from "material-ui/Tabs"
import { setValue } from "./actions"
import { connect } from "react-redux"
import { reduxForm } from "redux-form"

class Navbar extends Component {
  componentDidMount() {
    this.props.dispatch(setValue("HOME"))
  }
  render() {
    const { value } = this.props
    return (
      <Tabs value={value}>
        <Tab label={"Book Finder"} value={"HOME"}></Tab>
      </Tabs>
    )
  }
}

const mapStateToProps = (state) => {
  const { value } = state.navbar
  return {
    value,
  }
}

const mapForm = {
  form: "navbar",
}

export default connect(mapStateToProps)(reduxForm(mapForm)(Navbar))
