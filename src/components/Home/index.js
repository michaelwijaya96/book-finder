import React, { Component } from "react"
// import BookCard from "./Card/index"
import {
  onTypeSearchBar,
  onClickBookLink,
  setSearchQuery,
  onClickPagination,
} from "./actions"
import { connect } from "react-redux"
import { reduxForm } from "redux-form"
import Button from "@material-ui/core/Button"

import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import Typography from "@material-ui/core/Typography"
import Rating from "@material-ui/lab/Rating"
import Grid from "@material-ui/core/Grid"
import Pagination from "@material-ui/lab/Pagination"
import Loading from "../Loading/index"

import Input from "@material-ui/core/Input"

class Home extends Component {
  timer = null

  onTypeSearchBar = (e) => {
    clearTimeout(this.timer)
    this.props.dispatch(setSearchQuery(e.target.value))
    this.timer = setTimeout(this.triggerChange, 500)
  }

  triggerChange = () => {
    if (this.props.query !== "")
      this.props.dispatch(onTypeSearchBar(this.props.query))
  }

  handlePagination = (e, value) => {
    this.props.dispatch(onClickPagination(this.props.query, value))
  }

  onClickBookLink = (id, value) => {
    this.props.dispatch(onClickBookLink(this.props.history, id, value))
  }

  render() {
    const { listBook, isLoading, query } = this.props

    return (
      <div className={"components"}>
        <div style={{ paddingLeft: "12px", paddingTop: "12px" }}>
          <span>Search : </span>
          <Input onChange={this.onTypeSearchBar} value={query}></Input>
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          <React.Fragment>
            <Grid container spacing={2}>
              {listBook.data &&
                listBook.data.items &&
                listBook.data.items.map((v, i) => {
                  const image =
                    v.volumeInfo !== undefined &&
                    v.volumeInfo.imageLinks !== undefined
                      ? v.volumeInfo.imageLinks.thumbnail
                      : null
                  return (
                    <Grid item xs={4}>
                      <Card className={"md-12"} style={{ maxWidth: "368px" }}>
                        <CardHeader
                          title={
                            v.volumeInfo !== undefined
                              ? v.volumeInfo.title
                              : "There is no title"
                          }
                          subheader={
                            v.volumeInfo !== undefined &&
                            v.volumeInfo.publishedDate !== undefined &&
                            v.volumeInfo.publishedDate !== ""
                              ? v.volumeInfo.publishedDate
                              : "Date Not Specified"
                          }
                          style={{
                            overflowY: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: "368px",
                            whiteSpace: "nowrap",
                          }}
                        />
                        <div style={{ textAlign: "center" }}>
                          {image == null ? (
                            <img
                              src="/logo192.png"
                              style={{ height: "200px" }}
                            />
                          ) : (
                            <img src={image} style={{ height: "200px" }} />
                          )}
                        </div>

                        <CardContent
                          style={{
                            overflowY: "hidden",
                            textOverflow: "ellipsis",
                            width: "100%",
                            whiteSpace: "nowrap",
                          }}
                        >
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            {v.volumeInfo !== undefined &&
                            v.volumeInfo.description !== undefined
                              ? v.volumeInfo.description
                              : "No Description"}
                          </Typography>
                        </CardContent>
                        <CardActions
                          disableSpacing
                          style={{ textAlign: "center", display: "block" }}
                        >
                          {v.volumeInfo !== undefined &&
                          v.volumeInfo.averageRating !== undefined ? (
                            <Rating value={v.volumeInfo.averageRating}></Rating>
                          ) : (
                            "No Rating"
                          )}
                        </CardActions>
                        <div
                          style={{ textAlign: "center", paddingBottom: "12px" }}
                        >
                          {v.volumeInfo !== undefined &&
                          v.volumeInfo.infoLink !== undefined ? (
                            <Button
                              variant="contained"
                              color="primary"
                              href={v.volumeInfo.infoLink}
                            >
                              Info
                            </Button>
                          ) : (
                            <div />
                          )}
                        </div>
                      </Card>
                      <br />
                    </Grid>
                  )
                })}
            </Grid>
            {listBook.data === undefined ||
            listBook.data.totalItems === undefined ||
            listBook.data.totalItems === 0 ? (
              <div />
            ) : (
              <Pagination
                count={Math.ceil(listBook.data.totalItems / 9)}
                color="primary"
                onChange={this.handlePagination}
              />
            )}
          </React.Fragment>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { listBook, query, isLoading } = state.home
  return {
    listBook,
    query,
    isLoading,
  }
}

const mapForm = {
  form: "home",
}

export default connect(mapStateToProps)(reduxForm(mapForm)(Home))
