// based on a codepen example by Nick Salloum:
// https://codepen.io/callmenick/pen/ZWMOEE

import React from "react";
import PropTypes from "prop-types";

const Rainbow = props => (
  <div className="Rainbow">
    <span className="Rainbow-stripe Rainbow-stripe--magenta" />
    <span className="Rainbow-stripe Rainbow-stripe--purple" />
    <span className="Rainbow-stripe Rainbow-stripe--blue" />
    <span className="Rainbow-stripe Rainbow-stripe--green" />
    <span className="Rainbow-stripe Rainbow-stripe--yellow" />
    <span className="Rainbow-stripe Rainbow-stripe--orange" />
    <span className="Rainbow-stripe Rainbow-stripe--red" />
    <span className="Rainbow-stripe Rainbow-stripe--magenta-light" />
    <span className="Rainbow-stripe Rainbow-stripe--purple-light" />
    <span className="Rainbow-stripe Rainbow-stripe--blue-light" />
    <span className="Rainbow-stripe Rainbow-stripe--green-light" />
    <span className="Rainbow-stripe Rainbow-stripe--yellow-light" />
    <span className="Rainbow-stripe Rainbow-stripe--orange-light" />
    <span className="Rainbow-stripe Rainbow-stripe--red-light" />
    <span id="magenta" />
    <span id="purple" />
    <span id="blue" />
    <span id="green" />
    <span id="yellow" />
    <span id="orange" />
    <span id="red" />
  </div>
);

Rainbow.propTypes = {
  classes: PropTypes.object
};

export default Rainbow;
