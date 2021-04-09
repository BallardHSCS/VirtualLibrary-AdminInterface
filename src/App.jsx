import React, { useEffect, useState } from "react";
import "./App.css";
import TextContentForm from "./TextContentForm";
import PATModal from "./PATModal";

import { Container } from "@material-ui/core";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

import { Octokit } from "@octokit/rest";

import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";

var octokit;

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
var username = "";

function App() {
  const [data, setData] = useState();
  const [loginSuccess, setLoginSuccess] = useState();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [PAT, setPAT] = React.useState("");
  const onChangePAT = (event) => {
    setPAT(event.target.value);
  };

  useEffect(() => {
    let SavedPAT = localStorage.getItem("PAT");
    if (SavedPAT !== "" && SavedPAT !== undefined) {
      console.log(SavedPAT);
      onLogin(SavedPAT);
    }
  }, []);

  const onLogin = async (event) => {
    if (event.type === undefined) {
      console.log(event);
      octokit = new Octokit({
        auth: event,
      });
    } else {
      octokit = new Octokit({
        auth: PAT,
      });
    }

    try {
      octokit.rest.repos
        .getContent({
          owner: "BallardHSCS",
          repo: "VirtualLibrary-AdminInterface",
          path: "config/config.json",
        })
        .then((fileInfo) => {
          var actual = JSON.parse(atob(fileInfo.data.content));
          config = actual;
          console.log(config);
          console.log("done!");
          setData([config]);
        });

      if (event.type !== undefined) {
        localStorage.setItem("PAT", PAT);
      }
      octokit.rest.users.getAuthenticated().then((user) => {
        username = user.data.login;
        setLoginSuccess(true);
      });
    } catch {
      setLoginSuccess(false);
    }
  };

  const onConfigSubmit = async (newConfig) => {
    var fileSha = "";

    octokit.rest.repos
      .getContent({
        owner: "BallardHSCS",
        repo: "VirtualLibrary-AdminInterface",
        path: "config/config.json",
      })
      .then((fileInfo) => {
        fileSha = fileInfo.data.sha;
        console.log(fileInfo);

        let newConfigJSON = JSON.stringify(newConfig);
        console.log(newConfigJSON);
        octokit.rest.repos.createOrUpdateFileContents({
          owner: "BallardHSCS",
          repo: "VirtualLibrary-AdminInterface",
          path: "config/config.json",
          sha: fileSha,
          message: "Config update from admin interface",
          content: Buffer.from(newConfigJSON).toString("base64"),
          "committer.name": "Admin Interface",
          "committer.email": "nlaha@outlook.com",
          "author.name": "Admin Interface",
          "author.email": "nlaha@outlook.com",
        });
      });
  };

  return (
    <div className="App">
      <MuiThemeProvider theme={defaultTheme}>
        <Container className="centerform">
          <h1 className="title">BHS Virtual Library</h1>
          <h2 className="subtitle">Admin Interface</h2>
          {!loginSuccess && (
            <PATModal PAT={PAT} onChangePAT={onChangePAT} onLogin={onLogin} />
          )}
          {data && loginSuccess && (
            <TextContentForm
              GithubUsername={username}
              IncomingConfig={config}
              onConfigSubmit={(e, newConfig) => onConfigSubmit(e, newConfig)}
            />
          )}
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
