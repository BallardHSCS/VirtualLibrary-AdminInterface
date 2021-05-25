import React, { useEffect, useState } from "react";
import "./App.css";
import { FormControl, Card, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";

import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import DeleteIcon from "@material-ui/icons/Delete";
import BrokenImageIcon from "@material-ui/icons/BrokenImage";

import MUIRichTextEditor from "mui-rte";
import { convertToRaw } from "draft-js";

import isbn from "node-isbn";

const useStyles = makeStyles({
  root: {
    marginBottom: 40,
    padding: 20,
  },
  formControl: {
    minWidth: "100%",
  },
  media: {
    height: "400px",
    backgroundSize: "contain",
  },
});

const visibleControls = [
  "bold",
  "italic",
  "bulletList",
  "numberList",
  "undo",
  "redo",
  "link",
];

/** Text entry fields, ie. posters, info panels, etc. */
function TextContentForm(props) {
  const classes = useStyles();

  const [books, setBooks] = useState([]);
  const [CurrISBN, setCurrISBN] = useState();
  const [LoadingStatus, setLoadingStatus] = useState();

  var IncomingConfig = props.IncomingConfig;

  const change = (state, id) => {
    // Get current content
    IncomingConfig[id] = JSON.stringify(
      convertToRaw(state.getCurrentContent())
    );
  };

  const upload = (state) => {
    IncomingConfig["featuredBooks"] = books;
    props.onConfigSubmit(IncomingConfig);
  };

  const changeISBN = (event) => {
    setCurrISBN(event.target.value.replace("-", ""));
  };

  const searchBooks = (state) => {
    setLoadingStatus(
      <Alert severity="info">
        <AlertTitle>Loading</AlertTitle>
        Searching destiny discover for books...
      </Alert>
    );

    var follettHeaders = new Headers();
    follettHeaders.append("Origin", "https://search.follettsoftware.com");
    follettHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      limit: 20,
      offset: 0,
      query: CurrISBN,
      searchFormatId: "0",
      selectedTab: "ALL",
      newTab: true,
      requestId: "",
      searchTypeId: "ISBN",
      resultsSortBy: "RELEVANCE",
    });

    var requestOptions = {
      method: "POST",
      headers: follettHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "https://nlaha-cors-relay.herokuapp.com/https://search.follettsoftware.com/metasearch/rest/v2/searches?pl=23730",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);

        let book = {
          title: result.hits[0].title,
          description: result.hits[0].genres.join(", "),
          imageLinks: { thumbnail: result.hits[0].coverURL[0] },
          authors: result.hits[0].authors,
        };

        book.bookIdx = result.requestId;
        console.log("Book found %j", book);
        setBooks((arr) => [...arr, book]);
        setLoadingStatus(
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>"{book.title} has been successfully
            loaded!"
          </Alert>
        );
      })
      .catch((error) => {
        console.log("Book not found", error);
        setLoadingStatus(
          <Alert severity="error">
            <AlertTitle>Error :(</AlertTitle>
            Open library does not have the requested book listed!
          </Alert>
        );
      });
  };

  const removeBook = (bookToRemove) => {
    setBooks(
      books.filter((book) => {
        return book.bookIdx !== bookToRemove.bookIdx;
      })
    );
  };

  return (
    <div>
      <Card className={classes.root}>
        <h2>Account</h2>
        <h3>Signed in as {props.GithubUsername}</h3>
        <Button
          variant="contained"
          className="submitbtn"
          onClick={() => {
            localStorage.setItem("PAT", "");
            window.location.reload();
          }}
          style={{ width: "50%" }}
        >
          Clear Stored Token & Sign Out
        </Button>
      </Card>
      <Card className={classes.root}>
        <h2>Info Panels</h2>
        <FormControl className={classes.formControl}>
          <h3 htmlFor="Makerspace-Info">Makerspace Info Panel</h3>
          <MUIRichTextEditor
            defaultValue={IncomingConfig["Makerspace-Info"]}
            controls={visibleControls}
            id="Makerspace-Info"
            label="Click here and start typing..."
            onChange={(state) => {
              change(state, "Makerspace-Info");
            }}
          />
          <h3 htmlFor="Printing-Info">Printing Station Info Panel</h3>
          <MUIRichTextEditor
            defaultValue={IncomingConfig["Printing-Info"]}
            controls={visibleControls}
            id="Printing-Info"
            label="Click here and start typing..."
            onChange={(state) => {
              change(state, "Printing-Info");
            }}
          />
          <h3 htmlFor="Bookshelf-Info">Bookshelf Info Panel</h3>
          <MUIRichTextEditor
            defaultValue={IncomingConfig["Bookshelf-Info"]}
            controls={visibleControls}
            id="Bookshelf-Info"
            label="Click here and start typing..."
            onChange={(state) => {
              change(state, "Bookshelf-Info");
            }}
          />
          <h3 htmlFor="Games-Info">Board Games Info Panel</h3>
          <MUIRichTextEditor
            defaultValue={IncomingConfig["Games-Info"]}
            controls={visibleControls}
            id="Games-Info"
            label="Click here and start typing..."
            onChange={(state) => {
              change(state, "Games-Info");
            }}
          />
          <h3 htmlFor="Film-Info">Film Room Info Panel</h3>
          <MUIRichTextEditor
            defaultValue={IncomingConfig["Film-Info"]}
            controls={visibleControls}
            id="Film-Info"
            label="Click here and start typing..."
            onChange={(state) => {
              change(state, "Film-Info");
            }}
          />
        </FormControl>
      </Card>
      <Card className={classes.root}>
        <h2>Featured Books</h2>
        <FormControl className={classes.formControl}>
          <div className="inline-container">
            <TextField
              className="isbn-input"
              id="outlined-basic"
              label="ISBN"
              variant="outlined"
              onChange={(event) => {
                changeISBN(event);
              }}
            />
            <Button onClick={searchBooks}>Search & Add Book</Button>
          </div>
          {LoadingStatus}
          <div className="book-grid">
            {books.map((book) => (
              <Card className="book">
                <CardHeader
                  action={
                    <IconButton
                      aria-label="remove-book"
                      onClick={(event) => {
                        removeBook(book);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                  title={book.title}
                  subheader={book.authors}
                />
                {book.imageLinks.thumbnail !== undefined ? (
                  <CardMedia
                    className={classes.media}
                    image={book.imageLinks.thumbnail.replace("-S.jpg", ".jpg")}
                    title={book.title}
                  />
                ) : (
                  <div
                    style={{ textAlign: "center", verticalAlign: "middle" }}
                    className={classes.media}
                  >
                    Book cover not found! :(
                    <br></br>
                    <BrokenImageIcon style={{ fontSize: 140 }} />
                  </div>
                )}
                {book.description !== undefined ? (
                  <CardContent>{book.description}</CardContent>
                ) : null}
              </Card>
            ))}
          </div>
        </FormControl>
      </Card>
      <Button
        variant="contained"
        color="primary"
        className="submitbtn"
        onClick={upload}
      >
        Upload Changes
      </Button>
    </div>
  );
}

export default TextContentForm;
