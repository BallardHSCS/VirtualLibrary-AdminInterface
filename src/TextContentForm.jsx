import "./App.css";
import { FormControl, Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

import MUIRichTextEditor from "mui-rte";
import { convertToRaw } from "draft-js";

const useStyles = makeStyles({
  root: {
    marginBottom: 40,
    padding: 20,
  },
  formControl: {
    minWidth: "100%",
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

  var IncomingConfig = props.IncomingConfig;

  const change = (state, id) => {
    // Get current content
    IncomingConfig[id] = JSON.stringify(
      convertToRaw(state.getCurrentContent())
    );
  };

  const upload = (state) => {
    props.onConfigSubmit(IncomingConfig);
  };

  return (
    <div>
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
        <h2>Display Objects</h2>
        <FormControl className={classes.formControl}>
          <h3 htmlFor="Whiteboard01">Whiteboard by bookshelves</h3>
          <MUIRichTextEditor
            defaultValue={IncomingConfig["Whiteboard01"]}
            controls={visibleControls}
            id="Whiteboard01"
            label="Click here and start typing..."
            onChange={(state) => {
              change(state, "Whiteboard01");
            }}
          />
          <h3 htmlFor="ProjectorScreen01">Wall projector screen</h3>
          <MUIRichTextEditor
            defaultValue={IncomingConfig["ProjectorScreen01"]}
            controls={visibleControls}
            id="ProjectorScreen01"
            label="Click here and start typing..."
            onChange={(state) => {
              change(state, "ProjectorScreen01");
            }}
          />
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
