import React, { Component } from "react"
import { Tabs } from "material-ui"
import { Tab } from "material-ui/Tabs"
import { setValue } from "./actions"
import { connect } from "react-redux"
import { reduxForm } from "redux-form"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"

class Navbar extends Component {
  componentDidMount() {
    this.props.dispatch(setValue("HOME"))
  }
  render() {
    const { value } = this.props
    return (
      <MuiThemeProvider>
        <Tabs value={value}>
          <Tab label={"HOME"}></Tab>
        </Tabs>
      </MuiThemeProvider>
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
