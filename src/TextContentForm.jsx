import "./App.css";
import { Button } from "@material-ui/core";
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Typography,
  Card,
  CardContent,
  CardActions,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MUIRichTextEditor from "mui-rte";

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
  "quote",
  "clear",
  "undo",
  "redo",
  "link",
];

/** Text entry fields, ie. posters, info panels, etc. */
function TextContentForm() {
  const classes = useStyles();

  return (
    <div>
      <Card className={classes.root}>
        <h2>Info Panels</h2>
        <FormControl className={classes.formControl}>
          <h3 htmlFor="Makerspace-Info">Makerspace Info Panel</h3>
          <MUIRichTextEditor
            controls={visibleControls}
            id="Makerspace-Info"
            label="Click here and start typing..."
          />
          <h3 htmlFor="Printing-Info">Printing Station Info Panel</h3>
          <MUIRichTextEditor
            controls={visibleControls}
            id="Printing-Info"
            label="Click here and start typing..."
          />
          <h3 htmlFor="Bookshelf-Info">Bookshelf Info Panel</h3>
          <MUIRichTextEditor
            controls={visibleControls}
            id="Bookshelf-Info"
            label="Click here and start typing..."
          />
          <h3 htmlFor="Games-Info">Board Games Info Panel</h3>
          <MUIRichTextEditor
            controls={visibleControls}
            id="Games-Info"
            label="Click here and start typing..."
          />
          <h3 htmlFor="Film-Info">Film Room Info Panel</h3>
          <MUIRichTextEditor
            controls={visibleControls}
            id="Film-Info"
            label="Click here and start typing..."
          />
        </FormControl>
      </Card>
      <Card className={classes.root}>
        <h2>Display Objects</h2>
        <FormControl className={classes.formControl}>
          <h3 htmlFor="Whiteboard01">Whiteboard by bookshelves</h3>
          <MUIRichTextEditor
            controls={visibleControls}
            id="Whiteboard01"
            label="Click here and start typing..."
          />
          <h3 htmlFor="ProjectorScreen01">Wall projector screen</h3>
          <MUIRichTextEditor
            controls={visibleControls}
            id="ProjectorScreen01"
            label="Click here and start typing..."
          />
        </FormControl>
      </Card>
    </div>
  );
}

export default TextContentForm;
