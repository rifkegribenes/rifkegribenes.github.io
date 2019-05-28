import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const Spinner = props => (
  <div>
    <CircularProgress className={props.classes.spinner} color="secondary" />
  </div>
);

export default Spinner;
