import "./App.css";
import TextContentForm from "./TextContentForm";

import Container from "@material-ui/core/Container";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import MUIRichTextEditor from "mui-rte";
import { Button } from "@material-ui/core";

const defaultTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

Object.assign(defaultTheme, {
  overrides: {
    MUIRichTextEditor: {
      root: {
        textAlign: "left",
        margin: "auto",
        paddingBottom: "80px",
        width: "100%",
      },
      editor: {
        borderBottom: "3px solid gray",
      },
    },
  },
});

function App() {
  return (
    <div className="App">
      <MuiThemeProvider theme={defaultTheme}>
        <Container className="centerform">
          <h1 className="title">BHS Virtual Library</h1>
          <h2 className="subtitle">Admin Interface</h2>
          <TextContentForm />
          <Button variant="contained" color="primary" className="submitbtn">
            Upload Changes
          </Button>
        </Container>

        <footer>
          <p>
            Copyright &copy;{" "}
            <script>document.write(new Date().getFullYear())</script> GCC All
            Rights Reserved
          </p>
        </footer>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
