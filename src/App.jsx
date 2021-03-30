import React, { useEffect, useState } from "react";
import "./App.css";
import TextContentForm from "./TextContentForm";

import Container from "@material-ui/core/Container";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

const defaultTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#f44336",
    },
    secondary: {
      main: "#fff",
    },
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
      toolbar: {
        paddingBottom: "20px",
      },
    },
  },
});

var config = {};

function App() {
  const [data, setData] = useState();

  useEffect(() => {
    fetch(process.env.REACT_APP_CONFIG_URL, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then(function (res) {
      res.json().then((data) => {
        config = data;
        console.log(config);
        console.log("done!");
        setData([config]);
      });
    });
  }, []);

  return (
    <div className="App">
      <MuiThemeProvider theme={defaultTheme}>
        <Container className="centerform">
          <h1 className="title">BHS Virtual Library</h1>
          <h2 className="subtitle">Admin Interface</h2>
          {data && <TextContentForm IncomingConfig={config} />}
        </Container>

        <footer>
          <p>
            Copyright &copy;{" "}
            <script>document.write(new Date().getFullYear())</script> BHS GCC
            All Rights Reserved
          </p>
        </footer>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
