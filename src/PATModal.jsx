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
