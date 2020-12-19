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
import SearchBar from "./SearchBar/index"
import Button from "@material-ui/core/Button"

import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import Typography from "@material-ui/core/Typography"
import Rating from "@material-ui/lab/Rating"
import Grid from "@material-ui/core/Grid"
import Pagination from "@material-ui/lab/Pagination"

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

  onClickBookLink = (value) => {
    console.log(value)
    //    this.props.dispatch(onClickBookLink(value))
  }

  render() {
    const { listBook } = this.props

    return (
      <div className={"components"}>
        <SearchBar onChange={this.onTypeSearchBar}></SearchBar>
        <Grid container spacing={2}>
          {listBook.data &&
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
                        <img src="/logo192.png" style={{ height: "200px" }} />
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
                      {v.averageRating !== undefined ? (
                        <Rating value={v.averageRating}></Rating>
                      ) : (
                        "No Rating"
                      )}
                    </CardActions>
                    <div style={{ textAlign: "center", paddingBottom: "12px" }}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          this.onClickBookLink(v.selfLink)
                        }}
                      >
                        Detail
                      </Button>
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
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { listBook, detailBook, query } = state.home
  return {
    listBook,
    detailBook,
    query,
  }
}

const mapForm = {
  form: "home",
}

export default connect(mapStateToProps)(reduxForm(mapForm)(Home))
