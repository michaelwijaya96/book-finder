import React, { Component } from "react"
// import BookCard from "./Card/index"
import { onTypeSearchBar, onClickBookLink, setSearchQuery } from "./actions"
import { connect } from "react-redux"
import { reduxForm } from "redux-form"
import SearchBar from "./SearchBar/index"

import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import Typography from "@material-ui/core/Typography"
import Rating from "@material-ui/lab/Rating"
import Grid from "@material-ui/core/Grid"

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

  render() {
    const { listBook } = this.props

    return (
      <div className={"components"}>
        <SearchBar onChange={this.onTypeSearchBar}></SearchBar>
        <Grid container spacing={2}>
          {listBook.data &&
            listBook.data.items.map((v, i) => {
              const image =
                v.volumeInfo !== undefined ||
                v.volumeInfo.imageLinks !== undefined
                  ? v.volumeInfo.imageLinks.thumbnail
                  : null
              return (
                <Grid item xs={4}>
                  <Card className={"md-12"} style={{ maxWidth: "368px" }}>
                    <CardHeader
                      title={
                        v.volumeInfo !== undefined ? v.volumeInfo.title : ""
                      }
                      subheader={
                        v.volumeInfo !== undefined
                          ? v.volumeInfo.publishedDate
                          : ""
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
                        <img src="/logo192.png" />
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
                    <CardActions disableSpacing>
                      {v.averageRating !== undefined ? (
                        <Rating value={v.averageRating}></Rating>
                      ) : (
                        "No Rating"
                      )}
                    </CardActions>
                  </Card>
                  <br />
                </Grid>
              )
              // return <BookCard key={i} props={v}></BookCard>
            })}
        </Grid>
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
