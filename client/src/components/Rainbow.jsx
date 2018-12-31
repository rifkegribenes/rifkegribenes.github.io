// based on a codepen example by Nick Salloum:
// https://codepen.io/callmenick/pen/ZWMOEE

import React from "react";
import PropTypes from "prop-types";

const Rainbow = props => (
  <div className="dblWrap">
    <div className="Glow-containers">
      <span className="Glow-container--start Glow-container-start--magenta">
        <span className="Glow-start Glow-start--magenta glow" />
      </span>
      <span className="Glow-container Glow-container--magenta">
        <span className="Glow-end Glow-end--magenta glow" />
      </span>
      <span className="Glow-container--start Glow-container-start--purple">
        <span className="Glow-start Glow-start--purple glow" />
      </span>
      <span className="Glow-container Glow-container--purple">
        <span className="Glow-end Glow-end--purple glow" />
      </span>
      <span className="Glow-container--start Glow-container-start--blue">
        <span className="Glow-start Glow-start--blue glow" />
      </span>
      <span className="Glow-container Glow-container--blue">
        <span className="Glow-end Glow-end--blue glow" />
      </span>
      <span className="Glow-container--start Glow-container-start--green">
        <span className="Glow-start Glow-start--green glow" />
      </span>
      <span className="Glow-container Glow-container--green">
        <span className="Glow-end Glow-end--green glow" />
      </span>
      <span className="Glow-container--start Glow-container-start--yellow">
        <span className="Glow-start Glow-start--yellow glow" />
      </span>
      <span className="Glow-container Glow-container--yellow">
        <span className="Glow-end Glow-end--yellow glow" />
      </span>
      <span className="Glow-container--start Glow-container-start--orange">
        <span className="Glow-start Glow-start--orange glow" />
      </span>
      <span className="Glow-container Glow-container--orange">
        <span className="Glow-end Glow-end--orange glow" />
      </span>
      <span className="Glow-container--start Glow-container-start--red">
        <span className="Glow-start Glow-start--red glow" />
      </span>
      <span className="Glow-container Glow-container--red">
        <span className="Glow-end Glow-end--red glow" />
      </span>
    </div>
    <div className="Rainbow hide" id="target-node">
      <span className="Rainbow-stripe Rainbow-stripe--magenta" />
      <span className="Rainbow-stripe Rainbow-stripe--purple" />
      <span className="Rainbow-stripe Rainbow-stripe--blue" />
      <span className="Rainbow-stripe Rainbow-stripe--green" />
      <span className="Rainbow-stripe Rainbow-stripe--yellow" />
      <span className="Rainbow-stripe Rainbow-stripe--orange" />
      <span className="Rainbow-stripe Rainbow-stripe--red" />
      */}
      <span className="Rainbow-stripe Rainbow-stripe--magenta-light" />
      <span className="Rainbow-stripe Rainbow-stripe--purple-light" />
      <span className="Rainbow-stripe Rainbow-stripe--blue-light" />
      <span className="Rainbow-stripe Rainbow-stripe--green-light" />
      <span className="Rainbow-stripe Rainbow-stripe--yellow-light" />
      <span className="Rainbow-stripe Rainbow-stripe--orange-light" />
      <span className="Rainbow-stripe Rainbow-stripe--red-light" />
      <span id="magenta" className="hide" />
      <span id="purple" className="hide" />
      <span id="blue" className="hide" />
      <span id="green" className="hide" />
      <span id="yellow" className="hide" />
      <span id="orange" className="hide" />
      <span id="red" className="hide" />
    </div>
  </div>
);

Rainbow.propTypes = {
  classes: PropTypes.object
};

export default Rainbow;
