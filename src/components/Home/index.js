import React, { Component } from "react"
// import BookCard from "./Card/index"
import { onTypeSearchBar, onClickBookLink, setSearchQuery } from "./actions"
import { connect } from "react-redux"
import { reduxForm } from "redux-form"
import SearchBar from "./SearchBar/index"

import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardMedia from "@material-ui/core/CardMedia"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import Collapse from "@material-ui/core/Collapse"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import Rating from "@material-ui/lab/Rating"

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
        {listBook.data &&
          listBook.data.items.map((v, i) => {
            const image =
              v.volumeInfo !== undefined ||
              v.volumeInfo.imageLinks !== undefined
                ? v.volumeInfo.imageLinks.thumbnail
                : null
            return (
              <Card>
                <CardHeader
                  action={
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={v.volumeInfo !== undefined ? v.volumeInfo.title : ""}
                  subheader={
                    v.volumeInfo !== undefined ? v.volumeInfo.publishedDate : ""
                  }
                />
                <div>
                  {image == null ? (
                    <img src="/logo192.png" />
                  ) : (
                    <img src={image} />
                  )}
                </div>

                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {v.volumeInfo !== undefined ? v.volumeInfo.description : ""}
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
            )
            // return <BookCard key={i} props={v}></BookCard>
          })}
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
