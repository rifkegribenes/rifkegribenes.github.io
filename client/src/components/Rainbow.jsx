// based on a codepen example by Nick Salloum:
// https://codepen.io/callmenick/pen/ZWMOEE

import React from "react";
import PropTypes from "prop-types";

const Rainbow = props => (
  <div className="Rainbow">
    <span className="Rainbow-stripe Rainbow-stripe--violet" />
    <span className="Rainbow-stripe Rainbow-stripe--indigo" />
    <span className="Rainbow-stripe Rainbow-stripe--blue" />
    <span className="Rainbow-stripe Rainbow-stripe--green" />
    <span className="Rainbow-stripe Rainbow-stripe--yellow" />
    <span className="Rainbow-stripe Rainbow-stripe--orange" />
    <span className="Rainbow-stripe Rainbow-stripe--red" />
  </div>
);

Rainbow.propTypes = {
  classes: PropTypes.object
};

export default Rainbow;
