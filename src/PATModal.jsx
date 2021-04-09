import "./App.css";
import React, { useEffect, useState } from "react";
import { FormControl, Card, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    marginBottom: 40,
    padding: 20,
  },
  formControl: {
    minWidth: "100%",
  },
});

function PATModal(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <h1>Please follow the steps below</h1>
      <h2>1. Visit the GitHub PAT generation page</h2>
      <a
        target="_blank"
        href="https://github.com/settings/tokens"
        style={{ textDecoration: "none" }}
      >
        <Button variant="contained" color="secondary">
          GitHub PAT Generation Page
        </Button>
      </a>
      <h2>2. Click "generate new token"</h2>
      <img src="Step1.jpg"></img>
      <h2>3. Set up the token as shown below</h2>
      <img src="Step2.jpg"></img>
      <h2>
        Copy the token to a safe place, you won't be able to copy it again
      </h2>
      <img src="Step3.jpg"></img>
      <h2>Please enter your GitHub Personal Access Token</h2>

      <div>
        <TextField
          style={{ width: "80%" }}
          id="outlined-basic"
          label="Github PAT"
          variant="outlined"
          value={props.PAT}
          onChange={props.onChangePAT}
        />
      </div>
      <div style={{ marginTop: "20px" }}>
        <Button variant="contained" color="primary" onClick={props.onLogin}>
          Login
        </Button>
      </div>
    </Card>
  );
}

export default PATModal;
