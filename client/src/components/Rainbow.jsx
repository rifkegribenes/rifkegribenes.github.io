// based on a codepen example by Nick Salloum:
// https://codepen.io/callmenick/pen/ZWMOEE

import React from "react";
import PropTypes from "prop-types";
import RasterRainbow from "../img/neonrainbow_transp-660.png";

const Rainbow = props => (
  <div className="dblWrap">
    {/*    <div className="Raster-rainbow-start target-img" id="raster">
      <img src={RasterRainbow}
        alt="rainbow"
        className="raster-img"
      />
    </div>*/}
    <div className="Glow-containers">
      <span className="Glow-container--start Glow-container-start--magenta">
        <span className="Glow-start Glow-start--magenta" />
      </span>
      <span className="Glow-container Glow-container--magenta">
        <span className="Glow-end Glow-end--magenta" />
      </span>
      <span className="Glow-container--start Glow-container-start--purple">
        <span className="Glow-start Glow-start--purple" />
      </span>
      <span className="Glow-container Glow-container--purple">
        <span className="Glow-end Glow-end--purple" />
      </span>
      <span className="Glow-container--start Glow-container-start--blue">
        <span className="Glow-start Glow-start--blue" />
      </span>
      <span className="Glow-container Glow-container--blue">
        <span className="Glow-end Glow-end--blue" />
      </span>
      <span className="Glow-container--start Glow-container-start--green">
        <span className="Glow-start Glow-start--green" />
      </span>
      <span className="Glow-container Glow-container--green">
        <span className="Glow-end Glow-end--green" />
      </span>
      <span className="Glow-container--start Glow-container-start--yellow">
        <span className="Glow-start Glow-start--yellow" />
      </span>
      <span className="Glow-container Glow-container--yellow">
        <span className="Glow-end Glow-end--yellow" />
      </span>
      <span className="Glow-container--start Glow-container-start--orange">
        <span className="Glow-start Glow-start--orange" />
      </span>
      <span className="Glow-container Glow-container--orange">
        <span className="Glow-end Glow-end--orange" />
      </span>
      <span className="Glow-container--start Glow-container-start--red">
        <span className="Glow-start Glow-start--red" />
      </span>
      <span className="Glow-container Glow-container--red">
        <span className="Glow-end Glow-end--red" />
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
